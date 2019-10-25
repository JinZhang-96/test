import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';


import { SettingsService } from './core/services/settings.service';
import { ThemesService } from './core/services/themes.service';
import { TitleService } from '@core/services/title.service';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { _HttpClient, Progress } from '@core/services/http.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }
  constructor(
    private settings: SettingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleSrv: TitleService,
    private breadcrumbService: BreadcrumbService
    ) {
  }

  ngOnInit() {
    this.router
        .events
        .filter(evt => evt instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe(event => {
              this.titleSrv.setTitle( event['title']);     
              this.breadcrumbService.setBreadcrumb(event['breadcrumb']) ;        
        });
  }

}
