import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {
 public breadcrumbs = [];
  constructor() { }

 public setBreadcrumb(breadcrumbs) {
    this.breadcrumbs = breadcrumbs;
 }

 public getBreadcrumb() {
    return this.breadcrumbs;
 }

}
