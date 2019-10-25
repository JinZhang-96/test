import { ValidatorFn } from '@angular/forms';
import { Control } from './control';

export  class ControlSelect extends  Control {

    options: {key: string, value: any}[] = [];

    constructor(options: {
        key: string,
        value?: any,
        formDirty?: boolean,
        formError?: string,
        validationMessage?: any,
        label?: string,
        placeHolder?: string,
        controlType?: string,
        validators?: ValidatorFn[],
        options?:  {key: string, value: any}[]
    }) {
        super(options);
        this.options = options.options || [];
    }
}
