import {Injectable} from '@angular/core';
import {_HttpClient} from '@core/services/http.client';
import {Observable} from 'rxjs/observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class PersonalService {

    constructor(public http: _HttpClient) {
    }


    get(url: string): Observable<any> {
        return this.http.get(environment.SERVER_URL + url);
    }

    add(url: string, body?: any): Observable<any> {
        return this.http.put(this.http.SERVER_URL + url, body);
    }

    delete(url: string, params?: any) {
        return this.http.delete(this.http.SERVER_URL + url, params);
    }

    update(url: string, body?: any) {
        return this.http.patch(this.http.SERVER_URL + url, body);
    }


}
