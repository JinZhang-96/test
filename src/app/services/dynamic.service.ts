import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Control } from '@shared/component/form/control';

@Injectable()
export class DynamicService {

  constructor( ) { }

    toFormGroup(controls: Control[] ) {

        const group: any = {};

        controls.forEach(control => {
            group[control.key] = new FormControl(control.value, control.validators);
        });
        return new FormGroup(group);
    }
}
