import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class LoginService {

    redirectUrl: string;

    isLogin = false;


    usr = {
        account: 'admin',
        password: '123456'
    };

    constructor(
        public injector: Injector
    ) {
    }


    /**
     * 登录的时候
     * @param {User} value 用户信息
     */
    login(user: any) {
        console.log(user);
        if (user.account === this.usr.account && user.password === this.usr.password) {
            this.isLogin = true;
            this.injector.get(Router).navigate([this.redirectUrl ? this.redirectUrl === '/login' ? '/' : this.redirectUrl : '/']);
        }
        else {
            this.injector.get(NzMessageService).info('账号或密码错误');
        }
    }


    /**
     * 用户退出的时候删除会话存储中的用户信息
     */
    logout(): void {
        this.injector.get(Router).navigateByUrl('/login');
    }


}
