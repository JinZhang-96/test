import {NgModule} from '@angular/core';
import {PageInfoService} from '@services/pageInfo/page-info.service';
import {GueMesComponent} from './gue-mes/gue-mes.component';
import {InlineTableService} from '@services/table/inline.table.service';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '', component: GueMesComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-comments', text: '留言管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [GueMesComponent],
    providers: [PageInfoService, InlineTableService]
})
export class GueMesModule {
}
