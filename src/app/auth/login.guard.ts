import {Injectable, Injector} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route
} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '@core/services/login.service';


@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        public injector: Injector,
        public router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url: string = route.path;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (!this.injector.get(LoginService).isLogin) {
            this.injector.get(LoginService).redirectUrl = url;
            this.injector.get(NzMessageService).info('请登陆');
            this.router.navigate(['login']);
        }
        return true;
    }
}
