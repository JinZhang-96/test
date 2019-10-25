import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from '@core/module-import-guard';
import {LoginGuard} from './login.guard';

@NgModule({
    imports: [],
    providers: [LoginGuard],
    declarations: []
})
export class AuthModule {
    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
