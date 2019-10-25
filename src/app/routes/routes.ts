import {LayoutComponent} from '../layout/layout.component';
import {LayoutFullScreenComponent} from '../layout/fullscreen/fullscreen.component';

import {HomeComponent} from './home/home.component';
import {LockComponent} from './pages/lock/lock.component';
import {RegisterComponent} from './pages/register/register.component';
import {ForgetComponent} from './pages/forget/forget.component';
import {MaintenanceComponent} from './pages/maintenance/maintenance.component';
import {Page404Component} from './pages/404/404.component';
import {Page500Component} from './pages/500/500.component';
import {LoginGuard} from '@auth/login.guard';
import {LoginComponent} from './pages/login/login.component'


export const routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivateChild: [LoginGuard],
        children: [
            {path: '', redirectTo: 'index', pathMatch: 'full'},
            {
                path: 'index',
                component: HomeComponent,
                data: {text: '主页', breadcrumb: [{icon: 'anticon anticon-home', url: '', text: '主页'}]}
            },
            {path: 'personal', loadChildren: './personal/personal.module#PersonalModule'},
            {path: 'passage', loadChildren: './passage/passage.module#PassageModule'},
            {path: 'pasType', loadChildren: './pas-type/pas-type.module#PasTypeModule'},
            {path: 'music', loadChildren: './music/music.module#MusicModule'},
            {path: 'photo', loadChildren: './photo/photo.module#PhotoModule'},
            {path: 'comment', loadChildren: './gue-mes/gue-mes.module#GueMesModule'},
            {path: 'slide', loadChildren: './slide/slide.module#SlideModule'},
            {path: 'flink', loadChildren: './f-link/f-link.module#FLinkModule'},
            {path: 'map-data', loadChildren: './map-data/map-data.module#MapDataModule'},
            // { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
            // { path: 'dashboard/v1', component: DashboardV1Component, data: { translate: 'dashboard_v1' } },
            // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
            // { path: 'elements', loadChildren: './elements/elements.module#ElementsModule' },
            // { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
            // { path: 'logics', loadChildren: './logics/logics.module#LogicsModule' },
            // { path: 'extras', loadChildren: './extras/extras.module#ExtrasModule' },
            // { path: 'pro', loadChildren: './pro/pro.module#ProModule' },
        ]
    },
    // 全屏布局
    // {
    //     path: 'data-v',
    //     component: LayoutFullScreenComponent,
    //     children: [
    //         { path: '', loadChildren: './data-v/data-v.module#DataVModule' },
    //     ]
    // },
    // 单页不包裹Layout
    {path: 'register', component: RegisterComponent, data: {translate: 'register'}},
    {path: 'login', component: LoginComponent, data: {title: 'login'}},
    {path: 'forget', component: ForgetComponent, data: {translate: 'forget'}},
    {path: 'lock', component: LockComponent, data: {translate: 'lock'}},
    {path: 'maintenance', component: MaintenanceComponent},
    {path: '404', component: Page404Component},
    {path: '500', component: Page500Component},
    {path: '**', redirectTo: '404'}
];
