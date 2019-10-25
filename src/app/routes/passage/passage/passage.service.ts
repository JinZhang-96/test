import {Injectable} from '@angular/core';
import {_HttpClient} from '@core/services/http.client';
import {Observable} from 'rxjs/observable';
import {PageInfo, PageInfoService} from '@services/pageInfo/page-info.service';

@Injectable()
export class PassageService {

    constructor(private http: _HttpClient, public pageInfoSev: PageInfoService) {
    }

    // 分页获取
    get(url: string, params?: any): Observable<any> {
        return this.pageInfoSev.getData(`${this.http.SERVER_URL}${url}`, params );
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

    getType(url: string): Observable<any> {
        return this.http.get(this.http.SERVER_URL + url);
    }

    // 单条查询
    g(url: string): Observable<any> {
        return this.http.get(this.http.SERVER_URL + url);
    }


}
