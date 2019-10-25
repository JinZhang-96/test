import {Injectable} from '@angular/core';
import {_HttpClient} from '@core/services/http.client';


@Injectable()
export class HomeService {
    constructor(public http: _HttpClient) {
    }

}
