import { Injectable } from '@angular/core';
import {  FormBuilder} from '@angular/forms';
import { Subject } from 'rxjs/Rx';

import { _HttpClient } from '../../core/services/http.client';
import { PageInfoService } from '../pageInfo/page-info.service';
import { BaseTable } from '@services/table/base.table';
import { ModalHelper } from '@shared/helper/modal.helper';
import { DynamicFormComponent } from '@shared/component/form/dynamic-form/dynamic-form.component';
import { environment } from '../../../environments/environment';
import { Control} from '@shared/component/form/control';


@Injectable()
export class DialogTableService extends  BaseTable {
    // 序列数据对象
    list = [];

    // 表单对象
    controls: Control[];

    // public  subject: Subject<boolean> = new Subject<boolean>();

    //  后台数据的观察者
    observer = {
        next: data => {
            this.loading = false;
            this.list = data;
        },
        error: err => {console.log(err);   this.loading = false; },
        complete: () => console.log('Observer got a complete notification')
    };

    constructor(fb: FormBuilder,  pageInfoService: PageInfoService,  http: _HttpClient, public modal: ModalHelper) {
        super(fb, pageInfoService, http);
    }


    load( params?: {[key: string]: string}) {
        this.getDate(params).subscribe(this.observer);
        // 模糊查询的订阅
        this.searchControl
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() =>  this.pageInfoService.pageInfo.currPage = 1 )
            .switchMap( (value) => value !== '' ?
                this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`,  {[this.key]: value})
                : this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`)
            )
            .do(() => this.loading = true)
            .subscribe( this.observer);
    }

    /**
     * 此方法和 load方法相同，为了解决分页查询，  当改变页面大小时，出现total<(pageNum-1)*pageSize的情况时，会先改变页数然后改变页面大小，所以要写为2个不同的函数名
     * @param {{[p: string]: string}} params
     */
    loadTimeout( params?: {[key: string]: string}) {
        this.getDate(params).subscribe(this.observer);
        // 模糊查询的订阅
        this.searchControl
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() =>  this.pageInfoService.pageInfo.currPage = 1 )
            .switchMap( (value) => value !== '' ?
                this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`,  {[this.key]: value})
                : this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`)
            )
            .do(() => this.loading = true)
            .subscribe( this.observer);
    }

    // 删除数据
    del(params: string) {
        this.removeDate(params).subscribe( next => this.load());
    }


     /**
     *  点击对话框背景会退出
     * @param {{[p: string]: string}} data  要放到表单的参数
     * @param {Object} param  组件参数
     * @param {"sm" | "md" | "lg"} size  对话框大小
     * @param options  组件样式参数
     */
    // //  编辑一条数据
    edit(data?: any, param?: Object, size: 'sm' | 'md' | 'lg' | '' | number = 'lg', options?: any ) {
        this.setValue(data);
        this.modal.open(DynamicFormComponent,
                     Object.assign(param, {controls: this.controls},
                     {url: `${environment.SERVER_URL + this.updateUrl}`}),
            size,
            options)
            .subscribe(res => this.load());
    }

    /**
     *  点击对话框背景会退出
     * @param {Object} param  组件参数
     * @param {{[p: string]: string}} data  要放到表单的参数
     * @param {"sm" | "md" | "lg"} size  对话框大小
     * @param options  组件样式参数
     */
    //  创建一条序列信息
    add( param?: Object, data?: {[key: string]: string}, size: 'sm' | 'md' | 'lg' | '' | number = 'lg', options?: any) {
            this.clearValue();
            if (data)
                this.setValue(data);
            this.modal.open(DynamicFormComponent,
                             Object.assign(param, {controls: this.controls},
                            {url: `${environment.SERVER_URL + this.saveUrl}`}),
                size,
                options)
                      .subscribe(res => this.load());
    }
    /**
     *   点击对话框背景不会退出
     * @param {Object} param  组件参数
     * @param {{[p: string]: string}} data  要放到表单的参数
     * @param {"sm" | "md" | "lg"} size  对话框大小
     * @param options  组件样式参数
     */
    //  创建一条序列信息
    addStatic( param?: Object, data?: {[key: string]: string}, size: 'sm'| 'md'| 'lg' | number = 'lg', options?: any) {
        this.clearValue();
        if (data)
            this.setValue(data);
        this.modal.static(DynamicFormComponent,
            Object.assign(param, {controls: this.controls},
                {url: `${environment.SERVER_URL + this.saveUrl}`}),
            size,
            options)
            .subscribe(res => this.load());
    }

    setValue(data: any) {
        this.controls.forEach((control) => {
            control.value = data[control.key];
        });
    }

    clearValue() {
        this.controls.forEach((control) => {
            control.value = '';
        });
    }


}
