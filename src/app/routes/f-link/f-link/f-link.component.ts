import {Component, OnInit} from '@angular/core';
import {InlineTableService} from '@services/table/inline.table.service';
import {Validators} from '@angular/forms';
@Component({
    selector: 'app-f-link',
    templateUrl: './f-link.component.html',
    styleUrls: ['./f-link.component.less']
})
export class FLinkComponent implements OnInit {
    // 验证参数


    formError = {
        'name': '',
        'url': ''
    };
    formDirty = {
        'name': '',
        'url': ''
    };
    validationMessage = {
        'name': {
            'required': '必填选项！'
        }, 'url': {
            'required': '必填选项！'
        }
    };

    control: any = {
        id: [null],
        name: [null, [Validators.required]],
        url: [null,[Validators.required]]
    };
    constructor(private inlineTable: InlineTableService) {
        this.inlineTable.formError = this.formError;
        this.inlineTable.formDirty = this.formDirty;
        this.inlineTable.validationMessage = this.validationMessage;
        this.inlineTable.control = this.control;
        this.inlineTable.queryUrl = 'fl/get';

        this.inlineTable.deleteUrl = 'fl/delete';
        this.inlineTable.saveUrl = 'fl/add';
        this.inlineTable.updateUrl = 'fl/update';

        this.inlineTable.key = 'name';
        this.inlineTable.id = 'id';
    }

    ngOnInit() {
        //  构建表单
        this.inlineTable.buildForm();
        // 获取数据
        this.inlineTable.load();
    }

}
