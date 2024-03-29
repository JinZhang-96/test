import {NgModule, Optional, SkipSelf} from '@angular/core';

import {throwIfAlreadyLoaded} from './module-import-guard';

import {SettingsService} from './services/settings.service';
import {MenuService} from './services/menu.service';
import {ThemesService} from './services/themes.service';
import {ScrollService} from './services/scroll.service';
import {ColorsService} from './services/colors.service';
import {ACLService} from './acl/acl.service';
import {TokenService} from './net/token/token.service';
import {_HttpClient} from './services/http.client';
import {TitleService} from '@core/services/title.service';
import {BreadcrumbService} from '@core/services/breadcrumb.service';
import {LoginService} from '@core/services/login.service';


@NgModule({
    imports: [],
    providers: [
        ThemesService,
        SettingsService,
        MenuService,
        ScrollService,
        ColorsService,
        ACLService,
        TokenService,
        _HttpClient,
        TitleService,
        BreadcrumbService,
        LoginService
    ],
    declarations: [],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
