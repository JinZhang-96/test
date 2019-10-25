import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PassageComponent} from './passage/passage.component';
import {PassageService} from './passage/passage.service';
import {FileComponent} from './file/file.component';
import {WordListComponent} from './word-list/word-list.component';
import {PassageDetailsComponent} from './passage-details/passage-details.component';
import {SharedModule} from '@shared/shared.module';
import {PassageDoComponent} from './passage-do/passage-do.component';
import {PageInfoService} from '@services/pageInfo/page-info.service'

const routes: Routes = [
    {
        path: '', component: PassageComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-th-large', text: '文章管理'}]
        }
    },
    {
        path: 'detail', component: PassageDetailsComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-bars', text: '文章管理', url: '/passage'},
                {icon: 'fa fa-detail', text: '文章详情'}]
        }

    },
    {
        path: 'do', component: PassageDoComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-bars', text: '文章管理', url: '/passage'},
                {icon: 'fa fa-edit', text: '文章编辑'}]
        }

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [PassageComponent, FileComponent, PassageDetailsComponent, WordListComponent, PassageDoComponent],
    providers: [PageInfoService, PassageService]
})
export class PassageModule {
}
