import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Control} from '../control';
import {DynamicService} from '@services/dynamic.service';
import {_HttpClient, POSTSTATUS} from '@core/services/http.client';
import {NzModalSubject, NzMessageService, UploadFile} from 'ng-zorro-antd';


@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit {
    // 渲染表单控件
    @Input() controls: Control[] = [];

    @Input() params: Object;

    @Input() url: string;

    @Input() title: string;

    // @Input() isFile: boolean = false;

    @Input() musicUploadUrl: string = null;

    @Input() imageUploadUrl: string = null;

    @Input() sendStatus: POSTSTATUS;

    // @Input() isModal: boolean;

    loading = false;

    form: FormGroup;

    constructor(public modal: NzModalSubject, public dns: DynamicService, public http: _HttpClient,  public msg: NzMessageService) {
    }

    ngOnInit() {
        this.form = this.dns.toFormGroup(this.controls);
        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

// 表单数据的改变的观察者
    onValueChanged(data?: any) {
        if (!this.form) {
            return;
        }
        const ctrls = this.form;
        this.controls.forEach((control, index) => {
            const ctrl = ctrls.get(control.key);
            control.formDirty = false;
            if (ctrl && ctrl.dirty)
                control.formDirty = true;
            control.formError = '';
            if (ctrl && ctrl.dirty && ctrl.invalid) {
                const messages = control.validationMessage;
                for (const key in ctrl.errors) {
                    control.formError = messages[key];
                    break;
                }
            }
        });
    }

    onSubmit() {
        this.loading = true;
        // if (this.isFile) {
        // this.http.sendFile(this.url, this.form.getRawValue())
        //     .subscribe(next => {
        //         this.loading = false;
        //         this.modal.destroy('onOk');
        //     }, error => this.loading = false);
        // }

        // if (!this.isFile) {
        //
            this.http.post(this.url, this.form.getRawValue())
                .subscribe(next => {
                    this.loading = false;
                    this.modal.destroy('onOk');
                }, error => this.loading = false);
        // }

    }


}
