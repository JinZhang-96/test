import { Injectable } from '@angular/core';
import { _HttpClient, POSTSTATUS } from '@core/services/http.client';

import {Observable} from 'rxjs/Observable';

export { _HttpClient, POSTSTATUS } from '@core/services/http.client';

export interface  PageInfo {
   // 当前页数
    currPage: number;
    // 每页的数量
    pageSize: number;
    // 当前页的数量
    size: number;

    // 由于startRow和endRow不常用，这里说个具体的用法
    // 可以在页面中"显示startRow到endRow 共size条数据"
    // 总记录数
    totalCount: number;
    // 总页数
    totalPage: number;
}

@Injectable()
export class PageInfoService {

    public _pageInfo: PageInfo ;

    get pageInfo(): PageInfo {
        if (!this._pageInfo) {
            this._pageInfo = Object.assign(<PageInfo>{
                currPage : 1,
                pageSize : 10,
                totalCount: 0
            });
        }
        return this._pageInfo;
    }

    set pageInfo(value: PageInfo) {
        this._pageInfo = value;
    }

    constructor( public  http: _HttpClient) {console.log('inject')}

  getData(url: string, params?: object, status?: POSTSTATUS): Observable<any> {
     return this.http.get(url, Object.assign({}, this.pageInfo, params))
         .map((event) => {
              if (event['datas']['pageInfo'])
                     this.pageInfo.totalCount = event['datas']['pageInfo']['totalCount'] || 0;
              return  event['datas']['pageInfo']['list'];
         });
  }


}
