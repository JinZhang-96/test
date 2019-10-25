import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from '../layout/layout.module';
import { ServicesModule} from '@services/services.module';
import { routes } from './routes';
import { HomeComponent } from './home/home.component';
import { AuthModule} from '@auth/auth.module'
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, {useHash: true}),
        PagesModule,
        LayoutModule,
        ServicesModule.forRoot(),
        AuthModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {}
