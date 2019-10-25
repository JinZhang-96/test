import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { ServicesModule} from '@services/services.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { StartupService } from './core/services/startup.service';


export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        CoreModule,
        RoutesModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh' },
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
