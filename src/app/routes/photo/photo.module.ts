import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PageInfoService} from '@services/pageInfo/page-info.service';
import {DialogTableService} from '@services/table/dialog.table.service';
import {SharedModule} from '@shared/shared.module';
import {PhotoComponent} from './photo/photo.component';

const routes: Routes = [
    {
        path: '', component: PhotoComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa a-area-chart', text: '相册管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [PhotoComponent],
    providers: [PageInfoService, DialogTableService]
})

export class PhotoModule {
}
