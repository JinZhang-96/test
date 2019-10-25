import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PersonalService} from './personal.service';
import {AddPersonalComponent} from '../add-personal/add-personal.component';
import {environment} from '../../../../environments/environment';
import {ModalHelper} from '@shared/helper/modal.helper';


@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.less'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PersonalComponent implements OnInit {

    load = true;

    personal = null;

    prefix = environment.SERVER_URL;

    constructor(public sev: PersonalService, public modal: ModalHelper) {
    }

    ngOnInit() {
        this.get();
    }


    add() {
        this.modal.static(AddPersonalComponent, null, 'lg', {
            'title': '导入个人信息'
        }).subscribe(next => {
            this.get();
        });
    }

    edit() {
        this.modal.static(AddPersonalComponent, {status: 'edit', personal: this.personal}, 'lg', {
            'title': '编辑个人信息'
        }).subscribe(next => {
            this.get();
        });
    }


    get() {
        this.load = true;
        this.sev.get('personal/get').subscribe(next => {
            this.personal = next.datas.data;
            this.personal.image = this.prefix + this.personal.image;
            this.load = false;
        });

    }


}
