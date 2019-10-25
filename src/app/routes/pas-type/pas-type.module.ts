import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeComponent} from './type/type.component';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PageInfoService} from '@services/pageInfo/page-info.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [
    {
        path: '', component: TypeComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-bars', text: '文章类别管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [TypeComponent],
    providers: [PageInfoService]
})
export class PasTypeModule {
}
