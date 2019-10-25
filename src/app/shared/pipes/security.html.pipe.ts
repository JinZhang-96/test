import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * 将html代码过滤为安全模式
 */
@Pipe({
  name: 'securityHtml'
})
export class SecurityHtmlPipe implements PipeTransform {

  constructor(public domSanitizer: DomSanitizer ) {}

  transform(value: any, args?: any): any {
      return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
