import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PageInfoService} from '@services/pageInfo/page-info.service';
import {SharedModule} from '@shared/shared.module';
import {MapDataComponent} from './map-data/map-data.component';
import {InlineTableService} from '@services/table/inline.table.service';
const routes: Routes = [
    {
        path: '', component: MapDataComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-map', text: '地图数据管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [MapDataComponent],
    providers: [PageInfoService, InlineTableService]
})
export class MapDataModule {
}
