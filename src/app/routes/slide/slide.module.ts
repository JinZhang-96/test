import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '@shared/shared.module';
import {SlideComponent} from './slide/slide.component';
import {PageInfoService} from '@services/pageInfo/page-info.service';

const routes: Routes = [
    {
        path: '', component: SlideComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-bars', text: '幻灯片管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [SlideComponent],
    providers: [PageInfoService]
})
export class SlideModule {
}
