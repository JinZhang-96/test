import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import swal, {SweetAlertType} from 'sweetalert2';
import {PassageService} from './passage.service';
// import { environment } from '../../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {PageInfoService} from '@services/pageInfo/page-info.service';


@Component({
    selector: 'app-passage',
    templateUrl: './passage.component.html',
    styleUrls: ['./passage.component.less'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PassageComponent implements OnInit {

    load = false;

    passages = [];

    style = 'expand';

    observer = {
        next: data => {
            this.passages = data;
            this.load = false;
        },
        error: err => {
            this.load = false;
            swal({type: 'error', title: `${err}`});
        },
        complete: () => console.log('Observer got a complete notification')
    };


    pasTypes = [];

    isCollapse = true;

    all = false;

    constructor(public ser: PassageService, private router: Router) {
        ser.getType('pt/all').subscribe(next => this.pasTypes = next['datas']['data']);
    }

    ngOnInit() {
        this.get();
    }

    get(currPage?: number) {
        if (currPage) {
            this.ser.pageInfoSev.pageInfo.currPage = currPage;
        }
        this.load = true;
        this.ser.get('p/get', {types:this.typeIds}).subscribe(this.observer);

    }


    get typeIds()  {
        return this.pasTypes.map(type => {
            if (type['check']) return type['typeCode'];
            else return;
        });
    };


    handChange(checked: boolean, index: number) {
        let isAll = true;
        this.pasTypes.forEach((pasType, i) => {
                if (index === i) {
                    pasType.check = !pasType.check;
                }
                if (!pasType.check) {
                    isAll = false;
                }
            }
        );
        this.all = isAll;
    }


    selectAll(checked: boolean) {
        this.pasTypes.forEach(pasType => {
                pasType.check = checked;
            }
        );

        this.all = !this.all;
    }

    toggleCollapse() {
        this.isCollapse = !this.isCollapse;
        this.isCollapse ? this.style = 'expand' : this.style = 'collapse';
    }


    delete(id: string) {
        this.ser.delete(`p/delete/${id}`).subscribe(next => {
            this.get();
        }, error => {
            swal({
                type: 'error',
                title: '删除失败'
            });
        });
    }

    update(id: string) {
        this.router.navigate(['passage/do', {id: id}]);
    }

    add() {
        this.router.navigateByUrl('passage/do');
    }
}

