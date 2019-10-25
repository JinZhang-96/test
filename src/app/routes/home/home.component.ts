import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Environment} from './environment';
import {HomeService} from './home.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [HomeService]
})
export class HomeComponent implements OnInit {

    config: Environment = {};

    constructor(
        public router: ActivatedRoute,
        public service: HomeService
    ) {
    }

    ngOnInit() {

        this.router.data
            .subscribe((data: { environment: Environment }) => {
                this.config = data['environment'];
            });
    }

}
