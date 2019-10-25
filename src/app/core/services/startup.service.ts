import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuService, MENUS} from './menu.service';
import {SettingsService} from './settings.service';
import {ACLService} from '../acl/acl.service';
import {TitleService} from '@core/services/title.service';
import {environment} from '../../../environments/environment';


/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(public menuService: MenuService,
                public settingService: SettingsService,
                public titleService: TitleService,
                public httpClient: HttpClient,
    ) {
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // 初始化系统参数

            this.httpClient.get('assets/app-data.json')
                .subscribe((res: any) => {
                    this.settingService.setApp(res.app);
                    // console.log(res.user);
                    this.settingService.setUser(res.user);
                    // // 设置ＡＣＬ权限为全量
                    // this.aclService.setFull(true);
                    // 初始化菜单
                    this.menuService.add(res.menu);

                    // // 设置标题前缀
                    this.titleService.prefix = res.app.name;
                    resolve(res);
                }, (err: HttpErrorResponse) => {
                    resolve(null);
                });
        });
    }
}

