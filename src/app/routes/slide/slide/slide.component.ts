import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {DialogTableService} from '@services/table/dialog.table.service';
import {Control, ControlSelect} from '@shared/component/form/index';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.less'],
    providers: [DialogTableService]
})
export class SlideComponent implements OnInit {
    controls: Control[] = [new Control({
        key: 'id',
        value: ''
    }), new ControlSelect({
        key: 'tit',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '标题',
        placeHolder: '标题',
        controlType: 'input',
        validators: [Validators.required]
    }), new ControlSelect({
        key: 'sDesc',
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

    constructor(public dialogTable: DialogTableService) {
        this.dialogTable.controls = this.controls;

        this.dialogTable.queryUrl = 'sl/get';
        this.dialogTable.deleteUrl = 'sl/delete';
        this.dialogTable.saveUrl = 'sl/add';
        this.dialogTable.updateUrl = 'sl/update';
        this.dialogTable.key = 'tit';
    }

    ngOnInit() {
        this.dialogTable.load();
    }

}
