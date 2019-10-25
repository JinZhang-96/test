import {Component, OnInit} from '@angular/core';
import {InlineTableService} from '@services/table/inline.table.service';
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.less'],
    providers: [InlineTableService]
})
export class TypeComponent implements OnInit {

    // 验证参数


    formError = {
        'pasTypeText': ''
    };
    formDirty = {
        'pasTypeText': ''
    };
    validationMessage = {
        'pasTypeText': {
            'required': '必填选项！'
        }
    };

    control: any = {
        typeCode: [null],
        pasTypeText: [null, [Validators.required]],
        isDelete: [null]
    };

    constructor(private inlineTable: InlineTableService) {
        this.inlineTable.formError = this.formError;
        this.inlineTable.formDirty = this.formDirty;
        this.inlineTable.validationMessage = this.validationMessage;
        this.inlineTable.control = this.control;
        this.inlineTable.queryUrl = 'pt/get';

        this.inlineTable.deleteUrl = 'pt/delete';
        this.inlineTable.saveUrl = 'pt/add';
        this.inlineTable.updateUrl = 'pt/update';

        this.inlineTable.key = 'pasTypeText';
        this.inlineTable.id = 'typeCode';
    }

    ngOnInit() {
        //  构建表单
        this.inlineTable.buildForm();
        // 获取数据
        this.inlineTable.load();

    }


    //  可观察对象不会被垃圾收集器自动回收的，防止内存泄漏；在组件销毁的时候，取消它们的订阅
    // ngOnDestroy() {
        // this.inlineTable.searchControl.unsubscribe();
    // }


}
