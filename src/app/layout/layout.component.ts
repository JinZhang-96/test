import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, RouteConfigLoadStart, NavigationError, ActivatedRoute} from '@angular/router';

import {SettingsService} from '@core/services/settings.service';
import {MenuService} from '@core/services/menu.service';
import {ScrollService} from '@core/services/scroll.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    isFetching = false;


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private scroll: ScrollService,
        private _message: NzMessageService,
    ) {

    }

    ngOnInit() {
        this.router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                this._message.error(`无法加载${evt.url}路由`, {nzDuration: 1000 * 3});
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }


            setTimeout(() => {
                this.scroll.scrollToTop();
                this.isFetching = false;
            }, 100);
        });

    }
}
