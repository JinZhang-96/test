import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PageInfoService} from '@services/pageInfo/page-info.service';
import {SharedModule} from '@shared/shared.module';

import {MusicComponent} from './music/music.component';
import {MusicService} from './music/music.service';
import {UploadComponent} from './upload/upload.component';


const routes: Routes = [
    {
        path: '', component: MusicComponent, data: {
            translate: 'user.title', breadcrumb: [
               {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-music', text: '音乐管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule

    ],
    declarations: [MusicComponent, UploadComponent],
    providers: [PageInfoService, MusicService]
})
export class MusicModule {
}
