import {Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';
@Component({
    selector: 'app-word-list',
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.less'],
    encapsulation: ViewEncapsulation.Emulated
})
export class WordListComponent implements OnInit {

    @Input('passage') doc: any;

    @Output('delete') deleteEvent = new EventEmitter<string>();

    @Output('update') updateEvent = new EventEmitter<string>();

    prefix: string = environment.SERVER_URL;

    constructor() {

    }

    ngOnInit() {
    }


    delete(id) {
        this.deleteEvent.emit(id);
    }


    update(id) {
        this.updateEvent.emit(id);
    }


}
