import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AngularWebStorageModule} from 'angular-web-storage';
import {NgZorroAntdModule, NZ_LOCALE, zhCN} from 'ng-zorro-antd';
import { EditorModule } from '@tinymce/tinymce-angular';


import {SparklineDirective} from './directives/sparkline.directive';
import {DownFileDirective} from './directives/down-file.directive';
import {ImageDirective} from './directives/image.directive';
import {FixedBtnsDirective} from './directives/fixed-btns.directive';
import {ErrorCollectComponent} from './directives/error-collect.directive';
import {EqualValidatorDirective} from './directives/equalValidator/equal-validator.directive';


import {MomentDatePipe} from './pipes/moment-date.pipe';
import {CNCurrencyPipe} from './pipes/cn-currency.pipe';
import {KeysPipe} from './pipes/keys.pipe';
import {YNPipe} from './pipes/yn.pipe';
import { SecurityHtmlPipe } from './pipes/security.html.pipe';
import { SplitPipe } from './pipes/split.pipe';

import {ModalHelper} from './helper/modal.helper';
import { TokenInterceptor } from '@core/net/token/token.interceptor';

import {
    FooterInfoComponent,
    VerifyImgComponent,
    DynamicFormComponent,
    NotFindComponent,
    UploadImageComponent,
    HtmlViewComponent
} from './component/index';
import { RichEditorComponent } from './component/rich-editor/rich-editor.component';
import {UploadFileComponent} from '@shared/component';







const COMPONENTS = [
    FooterInfoComponent,
    VerifyImgComponent,
    DynamicFormComponent,
    NotFindComponent,
    FooterInfoComponent,
    UploadFileComponent,
    UploadImageComponent,
    HtmlViewComponent,
    RichEditorComponent
];
const DIRECTIVES = [SparklineDirective, DownFileDirective, ImageDirective, FixedBtnsDirective, ErrorCollectComponent, EqualValidatorDirective];
const PIPES = [MomentDatePipe, CNCurrencyPipe, KeysPipe, YNPipe, SecurityHtmlPipe, SplitPipe];
const HELPERS = [ModalHelper];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularWebStorageModule,
        NgZorroAntdModule.forRoot(),
        EditorModule
    ],
    declarations: [...DIRECTIVES, ...PIPES, ...COMPONENTS],
    providers: [...HELPERS,
        {provide: NZ_LOCALE, useValue: zhCN},
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        AngularWebStorageModule,
        HttpClientModule,

        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
