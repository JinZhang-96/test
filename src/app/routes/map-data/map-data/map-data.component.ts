import {Component, OnInit} from '@angular/core';
import {InlineTableService} from '@services/table/inline.table.service';
import {Validators} from '@angular/forms';
import {MapDataService} from './map-data.service';
@Component({
    selector: 'app-f-link',
    templateUrl: './map-data.component.html',
    styleUrls: ['./map-data.component.less'],
    providers: [MapDataService]
})
export class MapDataComponent implements OnInit, OnAfterViewInit {
   
  
    constructor(private service: MapDataService) {        
    }

    ngOnInit() {
      // this.load()
    }

    ngAfterViewInit() {
        this.load()
    }
   
    load() {        
          this.service.initProvinces();
          this.service.initTable();
          this.service.initEvent();
    }

}
