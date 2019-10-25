import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as screenfull from 'screenfull';
import { NzModalService, NzMessageService} from 'ng-zorro-antd';
import { LocalStorageService } from 'angular-web-storage';

import {  Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { SettingsService, SidebarThemeType } from '@core/services/settings.service';
import { ThemesService } from '@core/services/themes.service';
import { MenuService } from '@core/services/menu.service';
import { ThemeType } from '@core/services/themes.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit  {

    q: string;
    focus = false;
    isFullscreen = false;
    searchToggled = false;
    appLoading = true;
    themes: { l: ThemeType, bg: string, nav: string, con: string }[] = [
        { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
        { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
        { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
        { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
        { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' },
        { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
        { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
        { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
        { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
        { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
    ];

    @ViewChild('qIpt')
    public qIpt: any;


   messageNotifications  = [];



    constructor(
        public menu: MenuService,
        public settings: SettingsService,
        public themeServ: ThemesService,
        public confirmServ: NzModalService,
        public storageServ: LocalStorageService,
        public messageServ: NzMessageService
    ) {

    }

    ngOnInit() {

    }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    toggleFullScreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        this.isFullscreen = !screenfull.isFullscreen;
    }

    qFocus() {
        this.focus = true;
    }

    qBlur() {
        this.focus = false;
        this.searchToggled = false;
    }

    searchToggleChange() {
        this.searchToggled = true;
        this.focus = true;
        this.qIpt._el.focus();
    }

    appChange() {
        setTimeout(() => this.appLoading = false, 500);
    }

    changeTheme(theme: ThemeType) {
        this.themeServ.setTheme(theme);
        this.settings.setLayout('theme', theme);
    }


    clearStorage() {
        this.confirmServ.confirm({
            title: `确定清除所有本地存储?`,
            onOk: () => {
                this.storageServ.clear();
                this.messageServ.success(`清除完成！`);
            }
        });
    }



}


            // window.onload = function() {

            //     Notification.requestPermission().then(next=> {

            //         console.log('then'+next)

            //          var notification = new Notification('q',{
            //             // noscreen: true,
            //             dir: 'rtl',
            //             body: '哈哈！酷！',
            //             tag: '2',
            //             icon: 'img/1.png',

            //             // renotify: true
            //         })
            //          // notification.

            //     }).catch(error=> {console.log('catch'+error)})


            // }
