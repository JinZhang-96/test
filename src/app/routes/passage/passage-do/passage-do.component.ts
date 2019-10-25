import {Component, OnInit, HostBinding, Injector, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PassageService} from '../passage/passage.service';
import swal, {SweetAlertType} from 'sweetalert2';
import {UploadFile} from 'ng-zorro-antd';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-passage-do',
    templateUrl: './passage-do.component.html',
    styleUrls: ['./passage-do.component.less']
})
export class PassageDoComponent implements OnInit {
    load = false;

    title_focus = false;

    state = 'create';

    form: FormGroup;

    types = [];

    prefix: string = environment.SERVER_URL;

    _url = `${this.prefix}p/upload`;

    get url() {
        return this._url.replace(/\//g, '\\');
    }

    avatarUrl = null;


    constructor(public active: ActivatedRoute, public injector: Injector, public fb: FormBuilder, public ser: PassageService) {
        this.form = this.fb.group({
            pasId: [null],
            pasTit: [null, [Validators.required]],
            pasTags: [null, []],
            thumb: [null],
            pasDesc: [null, [Validators.required]],
            pasCon: [null, [Validators.required]],
            pasCreateDate: [null],
            lookTol: [null],
            likeTol: [null],
            pasType: [null, [Validators.required]]
        });
    }

    ngOnInit() {
        this.active
            .params
            .filter(params => (JSON.stringify(params) !== '{}'))
            .subscribe(next => {
                    if (next.id) {
                        this.state = 'update';
                        this.load = true;
                        this.ser.g(`p/get/${next.id}`).subscribe(data => {
                                this.avatarUrl = `${environment.SERVER_URL}${data['datas']['data'].thumb}`;
                                this.form.patchValue(data['datas']['data']);
                                this.load = false;
                            }, error => {
                                this.load = false;
                                swal({type: 'error', title: '文章数据获取失败'});
                            }
                        );
                    }
                }, error => {
                }
            );
        this.ser.getType('pt/all').subscribe(next => this.types = next['datas']['data']);
    }



    beforeUpload = (file: File) => {
        const isJPG: boolean = (file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
            swal({type: 'error', title: '请上传正确图片格式'});
            return isJPG;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            swal({type: 'error', title: '图片不能大于2M！'});
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
            this.form.controls.thumb.patchValue(info.file.response.datas.image);
            return ;
        }

        if (info.file.status === 'error') {
            this.load = false;
            return;
        }
    }


    submit() {
        this.load = true;
        if (this.state === 'create') {
            this.ser.add('p/add', this.form.value)
                .subscribe(next => {
                    swal({type: 'info', title: '添加成功'});
                    this.load = false;
                }, error => {
                    this.load = false;
                    swal({type: 'error', title: '添加失败'});
                });
        }
        if (this.state === 'update') {

            this.ser.update('p/update', this.form.value)
                .subscribe(next => {
                    swal({type: 'info', title: '修改成功'});
                    this.load = false;
                }, error => {
                    this.load = false;
                    swal({type: 'error', title: '修改失败'});
                });

        }
    }

}
