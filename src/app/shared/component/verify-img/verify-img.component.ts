import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';



@Component({
  selector: 'app-verify-img',
  templateUrl: './verify-img.component.html',
  styleUrls: ['./verify-img.component.less'],
})
export class VerifyImgComponent implements OnInit  {
  @Output() valid = new EventEmitter<boolean>();
  @Input()  num = 4;
  public vImgForm: FormGroup;
  picTxt: string;
  str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  vefCode: string;

  public formErrors = {
    'vefCode': ''
  };
  public formDirtys = {
    'vefCode': '',
  };
  validationMessages = {
    'vefCode': {
      'required': '必填选项！',
      'minlength': '不能小于4位',
      'maxlength': '不能大于4位',
      'validateEqual': '验证码填写错误'
    }
  };
  constructor( public fb: FormBuilder) { }
  ngOnInit() {
        this.drawPic();
        this.buildForm();
  }
  buildForm(): void {
    this.vImgForm = this.fb.group({
      'vefCode': [
         this.vefCode,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
      ]
    });
    this.vImgForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.vImgForm) {
      return;
    }
    const form = this.vImgForm;
    for (const field in this.formDirtys) {
      this.formDirtys[field] = '';
      const control = form.get(field);
      if (control && control.dirty) {
        this.formDirtys[field] = 'true';
      }
    }
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
          break ;
        }
      }
    }
  }

  onInput() {
    this.valid.emit(this.formErrors.vefCode.length === 0);
  }


   randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
   randomColor(min, max) {
    const _r = this.randomNum(min, max);
    const _g = this.randomNum(min, max);
    const _b = this.randomNum(min, max);
    return 'rgb(' + _r + ',' + _g + ',' + _b + ')';
  }
   drawPic() {
    const canvas: HTMLCanvasElement = document.getElementsByTagName('canvas').item(0);
    this.picTxt = '';
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = this.randomColor(180, 240);
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < this.num; i++) {
      const x = (width - 10) / this.num * i + 10;
      const y = this.randomNum(height / 2 , height);
      const deg = this.randomNum(-45, 45);
      const txt = this.str[this.randomNum(0, this.str.length)];
      this.picTxt += txt;
      ctx.fillStyle = this.randomColor(10, 100);
      ctx.font = this.randomNum(16, 40) + 'px SimHei';
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    for ( let i = 0; i < this.num; i++) {
      ctx.strokeStyle = this.randomColor(90, 180);
      ctx.beginPath();
      ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
      ctx.stroke();
    }
    for (let i = 0; i < this.num * 10; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
