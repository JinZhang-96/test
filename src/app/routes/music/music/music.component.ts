import {Component, OnInit, OnDestroy} from '@angular/core';
import {Validators} from '@angular/forms';
import {DialogTableService} from '@services/table/dialog.table.service';
import {Control, ControlSelect} from '@shared/component/form/index';
import {MusicService} from './music.service';


@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.less'],
    providers: [DialogTableService]
})
export class MusicComponent implements OnInit, OnDestroy {
    controls: Control[] = [new Control({
        key: 'musicId',
        value: ''
    }), new ControlSelect({
        key: 'musicName',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '曲名',
        placeHolder: '曲名',
        controlType: 'input',
        validators: [Validators.required]
    }), new ControlSelect({
        key: 'singer',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '歌手',
        placeHolder: '歌手',
        controlType: 'input',
        validators: [Validators.required]
    }), new Control({
        key: 'album',
        value: '',
        label: '专辑',
        placeHolder: '专辑',
        controlType: 'input'
    }), new Control({
        key: 'path',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '音乐文件',
        placeHolder: '音乐文件',
        controlType: 'music',
        validators: [Validators.required]
    }), new Control({
        key: 'cover',
        value: '',
        validationMessage: {
            'required': '必填选项'
        },
        label: '音乐封面',
        placeHolder: '音乐封面',
        controlType: 'image',
        validators: [Validators.required]
    })];

    constructor(private ser: MusicService, private dialogTable: DialogTableService) {
        this.dialogTable.controls = this.controls;

        this.dialogTable.queryUrl = 'mu/get';
        this.dialogTable.deleteUrl = 'mu/delete';
        this.dialogTable.saveUrl = 'mu/add';
        this.dialogTable.updateUrl = 'mu/update';
        this.dialogTable.key = 'musicName';

    }

    ngOnInit() {
        // 拉取数据
        this.dialogTable.load();
    }

    ngOnDestroy() {
        this.dialogTable.searchControl.unsubscribe();
    }

}
