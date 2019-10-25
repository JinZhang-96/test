import {Injectable, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {  Observable, Subject } from 'rxjs/Rx';

import { _HttpClient } from '../../core/services/http.client';
import { PageInfoService } from '../pageInfo/page-info.service';
import { environment } from '../../../environments/environment';
import {BaseTable} from '@services/table/base.table';

@Injectable()
export class InlineTableService extends BaseTable {
    // 单体表格数据的错误数组
    formErrors: Array<any> = [];
    // 单体表格数据的触发数组
    formDirtys: Array<any> = [];
    // 单体表格数据的验证消息数组
    validationMessages: Array<any> = [];

    //  表格表单对象
    form: FormGroup;

    // 添加的对象是否已经保存
    isSave = false;

    // 表单每一条数据的ID名称
    id: string;

    // 正在编辑的对象信息
    editIndex = -1;
    editObj = {};

    //  后台数据的观察者
    observer = {
        next: data => {
            this.editIndex = -1;
            this.isSave = false;
            this.loading = false;

            let length = this.controls.length;

            while (length > 0) {
                this.controls.removeAt(length - 1);
                length--;
            }

            data.forEach(i => {

                const field = this.createControl();

                field.patchValue(i);
                this.controls.push(field);
            });

        },
        error: err => {console.log(err);  this.loading = false; },
        complete: () => console.log('Observer got a complete notification')
    };

    constructor(fb: FormBuilder,  pageInfoService: PageInfoService,  http: _HttpClient ) {
        super(fb, pageInfoService, http);

    }


    public _control: {[key: string]: any};

    get control(): {[key: string]: any} {
        return this._control;
    }

    set control(value: {[key: string]: any}) {
        this._control = value;
    }

//  错误信息的标准格式
    public _formError: {[key: string]: any};
    public _formDirty: {[key: string]: any};
    public _validationMessage: {[key: string]: any};

    get formError(): { [p: string]: any } {
        return this._formError;
    }

    set formError(value: { [p: string]: any }) {
        this._formError = value;
    }

    get formDirty(): { [p: string]: any } {
        return this._formDirty;
    }

    set formDirty(value: { [p: string]: any }) {
        this._formDirty = value;
    }

    get validationMessage(): { [p: string]: any } {
        return this._validationMessage;
    }

    set validationMessage(value: { [p: string]: any }) {
        this._validationMessage = value;
    }

    //  获取表格表单控件数组
    get controls() { return this.form.controls.controls as FormArray; }

    buildForm() {
        this.form = this.fb.group({
            controls: this.fb.array([])
        });
        // 检测表单数据的改变
        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));


        // 模糊查询的订阅
        this.searchControl
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() =>  this.pageInfoService.pageInfo.currPage = 1 )
            .switchMap( (value) => {
                this.loading = true;
                return value !== '' ?
                    this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`, {[this.key]: value})
                    : this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`) ;
            })
            .subscribe( this.observer);
    }


// 表单数据的改变的观察者
    onValueChanged(data?: any) {
        if (!this.form) {
            return;
        }
        const form = this.controls.controls;

        form.forEach((ctrl, index) => {
            for (const field in this.formDirtys[index]) {
                this.formDirtys[index][field] = '';
                const control = ctrl.get(field);
                if (control && control.dirty) {
                    this.formDirtys[index][field] = 'true';
                }
            }

            for (const field in this.formErrors[index]) {

                this.formErrors[index][field] = '';
                const control = ctrl.get(field);
                if (control && control.dirty && control.invalid) {
                    const messages = this.validationMessages[index][field];
                    for (const key in control.errors) {
                        this.formErrors[index][field] = messages[key];
                        break;
                    }
                }
            }
        });
    }

    //  创建单条表格表单控件
    createControl(): FormGroup {
        this.formErrors.push(Object.assign({}, this.formError));

        this.formDirtys.push(Object.assign({}, this.formDirty));

        this.validationMessages.push(Object.assign({}, this.validationMessage));

        return this.fb.group(this.control);
    }

    //  保存或修改一条数据， 并刷新
    save(index: number) {
        this.controls.at(index).markAsDirty();
        if (this.controls.at(index).invalid) return ;
        let post: Observable<any> ;
        if (this.controls.at(index).value[this.id])
            post = this.http.patch(`${environment.SERVER_URL + this.updateUrl}`, this.controls.at(index).value);
        else
            post = this.http.put(`${environment.SERVER_URL + this.saveUrl}`, this.controls.at(index).value);
        post
            .do(() => this.loading = true)
            .subscribe( next => this.load());
    }


    //  编辑一条数据
    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.controls.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.controls.at(index).value };
        this.editIndex = index;
    }

    //  取消序列信息的编辑
    cancel(index: number) {
        if (!this.controls.at(index).value[this.id]) {
            this.controls.removeAt(index);
            this.isSave = false;
        } else {
            this.controls.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }
    //  创建一条序列信息
    add() {
        this.controls.insert(0, this.createControl());
        this.edit(0);
        this.isSave = true;
    }


    // 删除数据
    del(params: string) {
            this.removeDate(params).subscribe( next => this.load());
    }

    load( params?: {[key: string]: string}) {
                this.getDate(params).subscribe(this.observer);

    }

    /**
     * 此方法和 load方法相同，为了解决分页查询，  当改变页面大小时，出现total<(pageNum-1)*pageSize的情况时，会先改变页数然后改变页面大小，所以要写为2个不同的函数名
     * @param {{[p: string]: string}} params
     */
    loadTimeout( params?: {[key: string]: string}) {
        this.getDate(params).subscribe(this.observer);
    }

}
