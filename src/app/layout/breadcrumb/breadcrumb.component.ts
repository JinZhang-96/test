import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {
  constructor(

      public breadcrumbService: BreadcrumbService

  ) { }

  ngOnInit() {
  }

}
