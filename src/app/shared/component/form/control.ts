import { ValidatorFn } from '@angular/forms';

export class Control {
    key?: string;
    value?: any;
    formDirty?: boolean;
    formError?: string;
    validationMessage?: any;
    label?: string;
    placeHolder?: string;
    controlType?: string;
    validators?: ValidatorFn[];
    param?: any;

    constructor(options: {
        key?: string,
        value?: any,
        formDirty?: boolean,
        formError?: string,
        validationMessage?: any,
        label?: string,
        placeHolder?: string,
        controlType?: string,
        validators?: ValidatorFn[]
    } = {} ) {

        this.key = options.key || '' ;
        this.value = options.value || '' ;
        this.formDirty = options.formDirty || false;
        this.formError = options.formError || '';
        this.validationMessage = options.validationMessage || {};
        this.label = options.label || '';
        this.placeHolder = options.placeHolder || '';
        this.controlType = options.controlType || '';
        this.validators = options.validators || null;
    }
}
