import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'split'
})
export class SplitPipe implements PipeTransform {

    constructor() {
    }

    transform(value: string, args?: any): any {
        let str = '';
        if (value && value !== '') {
            value = value + '';
            const length: number = value.length;
            for (let i = 0; i < length; i = i + 3) {
                const sub = value.substring(i, i + 3);
                if (length > i + 3) {
                    str += sub + args;
                }else {
                    str += sub;
                }
            }
        }else {
            str = value;
        }
        return str;
    }

}
