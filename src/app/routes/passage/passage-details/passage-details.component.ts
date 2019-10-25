import {Component, OnInit, HostBinding, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {PassageService} from '../passage/passage.service';
import swal, {SweetAlertType} from 'sweetalert2';

@Component({
    selector: 'app-passage-details',
    templateUrl: './passage-details.component.html',
    styleUrls: ['./passage-details.component.less']
    // encapsulation: ViewEncapsulation.Emulated
})
export class PassageDetailsComponent implements OnInit {

    load = false;

    doc = null;

    types = [];

    constructor(public active: ActivatedRoute, public ser: PassageService) {
    }

    ngOnInit() {
        this.active
            .params
            .filter(params => (JSON.stringify(params) !== '{}'))
            .subscribe(next => {
                    if (next.id) {
                        this.load = true;
                        this.ser.g(`p/get/${next.id}`).subscribe(data => {
                                this.doc = data['datas']['data'];
                                this.load = false;
                            }, error => {
                                this.load = false;
                                swal({type: 'error', title: '文章数据获取失败'});
                            }
                        );
                    }

                }, error => {
                }
            );
        this.ser.getType('pt/all').subscribe(next => this.types = next['datas']['data']);
    }
}

