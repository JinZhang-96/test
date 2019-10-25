import {NgModule, ModuleWithProviders} from '@angular/core';

import {PageInfoService} from './pageInfo/page-info.service';
import {InlineTableService} from './table/inline.table.service';
import {DynamicService} from './dynamic.service';
import {DynamicFormComponent} from '@shared/component/form/dynamic-form/dynamic-form.component';

const SERVICES = [InlineTableService, DynamicService];

@NgModule({
    imports: [],
    providers: [...SERVICES],
    declarations: [],
    entryComponents: [DynamicFormComponent],
    exports: []
})
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule
        };
    }

}
