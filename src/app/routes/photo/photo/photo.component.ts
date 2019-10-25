import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Control, ControlSelect} from '@shared/component/form/index';
import {DialogTableService} from '@services/table/dialog.table.service';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.less']
})
export class PhotoComponent implements OnInit {
    controls: Control[] = [new Control({
        key: 'photoId',
        value: ''
    }), new ControlSelect({
        key: 'photoName',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '名称',
        placeHolder: '名称',
        controlType: 'input',
        validators: [Validators.required]
    }), new ControlSelect({
        key: 'ptoDesc',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '描述',
        placeHolder: '描述',
        controlType: 'text',
        validators: [Validators.required]
    }), new Control({
        key: 'path',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '照片',
        placeHolder: '照片',
        controlType: 'image',
        validators: [Validators.required]
    })];

    constructor(private dialogTable: DialogTableService) {
        this.dialogTable.controls = this.controls;

        this.dialogTable.queryUrl = 'ph/get';
        this.dialogTable.deleteUrl = 'ph/delete';
        this.dialogTable.saveUrl = 'ph/add';
        this.dialogTable.updateUrl = 'ph/update';
        this.dialogTable.key = 'photoName';
        this.get();
    }

    ngOnInit() {
    }


    get pageInfo() {
        return this.dialogTable.pageInfoService.pageInfo;
    }


    get() {

            this.dialogTable.load()

    }
}
