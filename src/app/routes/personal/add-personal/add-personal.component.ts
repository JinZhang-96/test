import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PersonalService} from '../personal/personal.service';
import {NzMessageService, UploadFile,  NzModalSubject} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-add-personal',
    templateUrl: './add-personal.component.html',
    styleUrls: ['./add-personal.component.less'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AddPersonalComponent implements OnInit {


    @Input() status = 'add';

    @Input() personal = null;

    avatarUrl = null;

    load = false;

    form: FormGroup;

    _url = `${environment.SERVER_URL}personal/upload`;

    prefix: string = environment.SERVER_URL;

    get url() {
        return this._url.replace(/\//g, '\\');
    }


    constructor(public service: PersonalService, public subject: NzModalSubject, public msg: NzMessageService) {
        this.form = new FormGroup({
            userId: new FormControl(null),
            onlineName: new FormControl(null, [Validators.required]),
            profession: new FormControl(null, [Validators.required]),
            qq: new FormControl(null),
            email: new FormControl(null, [Validators.email]),
            desc: new FormControl(null),
            resume: new FormControl(null),
            image: new FormControl(null)
        });
    }

    ngOnInit() {
        if (this.personal) {
            this.form.patchValue(this.personal);
            if (this.personal.image) {
                this.avatarUrl = this.personal.image;
                this.form.controls.image.patchValue(this.personal.image.replace(this.prefix, ''));
            }
        }
    }


    beforeUpload = (file: File) => {
        const isJPG: boolean = (file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
            this.msg.error('请上传正确图片格式！');
            return isJPG;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            this.msg.error('图片不能大于2M！');
        }
        return isLt2M;
    }


    handleChange(info: { file: UploadFile, response: any }) {
        if (info.file.status === 'uploading') {
            this.load = true;
            return;
        }
        if (info.file.status === 'done') {
            this.load = false;
            this.avatarUrl = `${environment.SERVER_URL}${info.file.response.datas.image}`;
            this.form.controls.image.patchValue(info.file.response.datas.image);
        }
    }


    submitForm() {
        if (this.status === 'add') {
            this.service.add('personal/add', this.form.value)
                .subscribe(next => {
                    this.subject.destroy('onOk');
                }, error => this.load = false);
        } else if (this.status === 'edit') {
            this.service.update('personal/update', this.form.value)
                .subscribe(next => {
                    this.subject.destroy('onOk');
                }, error => this.load = false);
        }
    }
}
