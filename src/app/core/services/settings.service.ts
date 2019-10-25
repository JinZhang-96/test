import { Injectable } from '@angular/core';

import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

import { ThemeType } from './themes.service';

const KEY = 'layout';

const APP = 'app';

export  const  USER = 'user';



export type SidebarThemeType = 'light' | 'dark';

export interface Layout {
    /** 是否固定顶部菜单 */
    fixed: boolean;
    /** 是否折叠右边菜单 */
    collapsed: boolean;
    /** 是否固定宽度 */
    boxed: boolean;
    /** 当前主题 */
    theme: ThemeType;
    /** 语言环境 */
    lang: string;
}

@Injectable()
export class SettingsService {
    app = {
        name: '',
        year: (new Date()).getFullYear(),
        description: ''
    };


    user = {
        accout : '',
        nickName: ''
    };



    public _layout: Layout = null;

    get layout(): Layout {
        if (!this._layout) {
            this._layout = Object.assign(<Layout>{
                fixed: true,
                collapsed: false,
                boxed: false,
                theme: 'A',
                lang: null
            }, this.local.get(KEY));
            this.local.set(KEY, this._layout);
        }
        return this._layout;
    }

    setLayout(name: string, value: any): boolean {
        if (typeof this.layout[name] !== 'undefined') {
            this.layout[name] = value;
            this.local.set(KEY, this._layout);
            return true;
        }
        return false;
    }

    setApp(val: object) {
        this.app = Object.assign(this.app, val);
        this.local.set(APP, this.app);
    }

    getApp(): object {
        return Object.assign(this.app, this.local.get(APP));
    }



    setUser(val: object, isSave?: boolean) {
        this.user = Object.assign(this.user, val);
        this.session.set(USER, this.user);
        if (isSave)
            this.local.set(USER, val);
    }

    getUser(): any {
        return Object.assign(this.user, this.session.get(USER), this.local.get(USER));
    }

    /**
     * 删除浏览器会话数据库的用户信息
     */
    removeUser () {
        this.user = null;
        this.session.remove(USER);
    }

    /**
     * 删除浏览器会话和本地数据库的用户信息
     */
    clearUser() {
        this.user = null;
        this.local.remove( USER );
        this.session.remove(USER);
    }
    constructor(public local: LocalStorageService, public session: SessionStorageService) { }
}
