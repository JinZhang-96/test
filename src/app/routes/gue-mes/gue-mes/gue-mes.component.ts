import {Component, OnInit} from '@angular/core';
import {InlineTableService} from '@services/table/inline.table.service';
import {Validators} from '@angular/forms';

@Component({
    selector: 'app-gue-mes',
    templateUrl: './gue-mes.component.html',
    styleUrls: ['./gue-mes.component.less']
})
export class GueMesComponent implements OnInit {
    // 验证参数


    formError = {
        'gueMes': '',
        'gueMac': ''
    };
    formDirty = {
        'gueMes': '',
        'gueMac': ''
    };
    validationMessage = {
        'gueMes': {
            'required': '必填选项！'
        },
        'gueMac': {
            'required': '必填选项！'
        }
    };

    control: any = {
        gueMesId: [null],
        gueMac: [null, [Validators.required]],
        gueMes: [null, [Validators.required]],
        gueDate: [null]
    };

    constructor(private inlineTable: InlineTableService) {
        this.inlineTable.formError = this.formError;
        this.inlineTable.formDirty = this.formDirty;
        this.inlineTable.validationMessage = this.validationMessage;
        this.inlineTable.control = this.control;
        this.inlineTable.queryUrl = 'gm/get';

        this.inlineTable.deleteUrl = 'gm/delete';
        this.inlineTable.saveUrl = 'gm/add';
        this.inlineTable.updateUrl = 'gm/update';

        this.inlineTable.key = 'gusMes';
        this.inlineTable.id = 'gusMesId';
    }

    ngOnInit() {
        //  构建表单
        this.inlineTable.buildForm();
        // 获取数据
        this.inlineTable.load();
    }

}
