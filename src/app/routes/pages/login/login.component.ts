import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '@core/services/login.service';
import {_HttpClient, Progress} from '@core/services/http.client';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    userForm: FormGroup;

    isLoad = false;

    public verify: boolean;
    userInfo = {
        account: '',
        password: ''
    };

    public formErrors = {
        'account': '',
        'password': '',
        'formError': ''
    };
    public formDirtys = {
        'account': '',
        'password': ''
    };
    validationMessages = {
        'account': {
            'required': '必填选项！',
            'minlength': '大于2',
            'maxlength': '小于18'
        },
        'password': {
            'required': '必填选项！',
            'minlength': '大于2'
        }
    };

    constructor(public fb: FormBuilder,
                public router: Router,
                public loginService: LoginService,
    ) {
    }

    progress: Progress = {};

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'account': [
                this.userInfo.account,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(18)
                ]
            ],
            'password': [
                this.userInfo.password,
                [
                    Validators.required,
                    Validators.minLength(2),
                ]
            ]
        });
        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValidImg($event) {
        this.verify = $event;
    }

    onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;
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
                    break;
                }
            }
        }
    }

    login() {
        if (this.userForm.valid) {
            this.userInfo.password = this.userForm.value.password;
            this.userInfo.account = this.userForm.value.account;
            this.isLoad = true;
            this.loginService.login(this.userInfo);
            this.isLoad = false;
        } else {
            this.formErrors.formError = '存在不合法的输入项，请检查。';
        }
    }


}
