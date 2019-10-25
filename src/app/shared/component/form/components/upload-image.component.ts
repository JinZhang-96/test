import {Component, OnInit, Output, EventEmitter, Input, HostBinding, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {NzModalSubject, NzMessageService, UploadFile} from 'ng-zorro-antd';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-upload-image',
    template: `
        <nz-upload [nzAction]="url" nzLimit="1" nzAccept="image/*" [nzShowButton]="show"
                   [nzBeforeUpload]="beforeUpload" (nzChange)="handleChange($event)" [nzRemove]="remove"
        >
            <button nz-button>
                <i class="anticon anticon-upload"></i><span>上传照片</span>
            </button>
        </nz-upload>
    `,
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploadImageComponent),
            multi: true
        }
    ],
})
export class UploadImageComponent implements OnInit, ControlValueAccessor {

    prefix: string = environment.SERVER_URL;

    _url = null;

    @Input('url')
    set url(value: string) {
        this._url = this.prefix.concat(value);
    }

    get url(): string {
        return this._url.replace(/\//g, '\\');
    }


    show = true;


    filePath: string;

    propagateChange = (_: string) => {};


    constructor(public msg: NzMessageService) {
    }

    ngOnInit() {

    }

    public writeValue(obj: string) {
        this.filePath = obj;
    }

    // 当表单控件值改变时，函数 fn 会被调用
    // 这也是我们把变化 emit 回表单的机制
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // 这里没有使用，用于注册 touched 时的回调函数
    public registerOnTouched() {
    }


    beforeUpload = (file: File) => {
        const isJPG: boolean = ( file.type === 'image/gif' || file.type === 'image/bmp' ||  file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
            this.msg.error('请上传正确图片格式！');
        }
        const isLt2M = file.size / 1024 / 1024 <  2;

        if (!isLt2M) {
            this.msg.error('图片不能大于2M！');
        }
        return isLt2M;
    }

    handleChange(info: { file: UploadFile, response: any }) {
        if (info.file.status === 'done') {
            console.log(info.file.response.datas);
            this.filePath = info.file.response.datas.path;
            this.propagateChange(this.filePath);
            this.show = false;
        }
    }

    remove = (file: any) => {
        console.log('remove');
        this.filePath = null;
        this.propagateChange(this.filePath);
        this.show = true;
        return true;
    }

}
