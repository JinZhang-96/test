import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalComponent} from './personal/personal.component';
import {AddPersonalComponent} from './add-personal/add-personal.component';
import {PersonalService} from './personal/personal.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [
    {
        path: '', component: PersonalComponent, data: {
            translate: 'user.title', breadcrumb: [
                {icon: 'anticon anticon-home', url: '/index', text: '主页'},
                {icon: 'fa fa-address-card', text: '个人信息管理'}]
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [PersonalComponent, AddPersonalComponent],
    providers: [PersonalService],
    entryComponents: [AddPersonalComponent]
})
export class PersonalModule {
}
