import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarNavComponent } from './sidebar/nav/nav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
const COMPONENTS = [
    LayoutComponent,
    LayoutFullScreenComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
];

@NgModule({
    imports: [SharedModule, RouterModule],
    providers: [],
    declarations: [
        SidebarNavComponent,
        ...COMPONENTS
    ],
    exports: COMPONENTS
})
export class LayoutModule { }
