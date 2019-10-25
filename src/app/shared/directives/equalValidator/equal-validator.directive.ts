import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appValidateEqual]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }
  ]
})
export class EqualValidatorDirective implements Validator {
  @Input()appValidateEqual: string;
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } {
    // 当前控件的值
    const selfValue = control.value as string;
    // 需要比较的控件，根据属性名称获取
    const targetControl = control.root;
    // 值不相等
    if (targetControl && this.appValidateEqual && selfValue && selfValue.toLowerCase() !== this.appValidateEqual.toLowerCase() ) {
         return { validateEqual: false};
    }else {
      // 值相等，清空错误信息
      targetControl.setErrors(null);
    }
    return null;
  }
}
