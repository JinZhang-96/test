// tslint:disable:no-console class-name
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';

// import {setInterval, setTimeout} from 'timers';

/**
 *  进度条接口数据规范
 */
export interface Progress {
    loading?: boolean;
    num?: number;
}

export enum POSTSTATUS {

    SERIALIZE = 1,  // 以序列化数据访问
    JSON = 2,  // 以json数据访问
    DATA = 3, // 以文件数据访问
}

/**
 * 封装HttpClient，主要解决：
 * + 优化HttpClient在参数上便利性
 * + 统一实现 loading
 * + 统一处理时间格式问题
 */
@Injectable()
export class _HttpClient {

    constructor(public http: HttpClient) {
    }

    public _progress: Progress = {loading: false, num: 0};


    /** 是否正在加载中 */
    // get loading() {
    //     return this._loading;
    // }

    parseParams(params: any): HttpParams {
        let ret = new HttpParams();
        if (params) {
            // tslint:disable-next-line:forin
            for (const key in params) {
                let _data = params[key];
                // 将时间转化为：时间戳 (秒)
                if (moment.isDate(_data)) {
                    _data = moment(_data).unix();
                }
                ret = ret.set(key, _data);
            }
        }
        return ret;
    }

    // public begin() {
    //     console.time('http');
    //     this._progress.loading = true;
    //     this._progress.num = 0;
    // }

    // public end() {
    //     // console.timeEnd();
    //     this._progress.num = 100;
    //     setTimeout( () => {
    //         this._progress.num = 0;
    //         this._progress.loading = false;
    //     }, 200);
    // }

    /** 服务端URL地址 */
    get SERVER_URL(): string {
        return environment.SERVER_URL;
    }

    /**
     * GET请求
     *
     * @param {string} url URL地址
     * @param {*} [params] 请求参数
     */
    get(url: string, params?: any): Observable<any> {
        return this.http
            .get(url, {
                params: this.parseParams(params)
            })
            .catch((res) => {
                return res;
            });
    }

    /**
     * POST请求
     *
     * @param {string} url URL地址
     * @param {*} [body] body内容
     * @param {*} [params] 请求参数
     */
    post(url: string, body?: any, params?: any, sendStatus?: POSTSTATUS): Observable<any> {

        // sendStatus = sendStatus || POSTSTATUS.SERIALIZE;
        // params = Object.assign( params ||  {}, { sendStatus: sendStatus});
        // const fun = this.randomProgress(this._progress);

        return this.http
            .post(url, body || null, {
                params: this.parseParams(params)
            })
            .catch((res: HttpResponse<any>) => {
                // fun.unref();
                if (res.status === 200)
                    return Observable.throw(res.body['message']);
                return Observable.throw(res.body);
            });
    }


    /**
     * 上传文件
     * @param url: string请求地址
     * @param type: string 请求类型，默认POST
     * @param body: any 发送数据
     * @param params: any 发送参数
     */
    sendFile(url: string, body?: any, sendStatus?: POSTSTATUS, type?: string, params?: any): Observable<any> {


        const formData = new FormData();

        for (const key in body) {
            if (body[key])
                formData.set(key, body[key]);
        }

        const req = new HttpRequest(type || 'POST', `${environment.SERVER_PREFIX}${url}`, formData, {
            reportProgress: true
        });

        const newReq = req.clone({params: this.parseParams(params)});

        return this.http.request(newReq)
            .catch((res: HttpResponse<any>) => {
                if (res.status === 200)
                    return Observable.throw(res.body['result']['message']);
                return Observable.throw(res.body);
            });
    }

    /**
     * DELETE请求
     *
     * @param {string} url URL地址
     * @param {*} [params] 请求参数
     */
    delete(url: string, params?: any): Observable<any> {
        return this.http
            .delete(url, {
                params: this.parseParams(params)
            })
            .catch((res) => {
                return res;
            });
    }

    put(url: string, body?: any) {
        return this.http.put(url, body)
            .catch((res) => {
                return res;
            });
    }


    patch(url: string, body?: any) {
        return this.http.patch(url, body)
            .catch((res) => {
                return res;
            });
    }

    /**
     *  模拟进度条加载
     * @param {Progress} progress
     * @returns {NodeJS.Timer}
     */
    // randomProgress(progress: Progress) {
    //   return  setInterval( () => {
    //       if (progress.num < this.max2All + this.max2) {
    //           if (progress.num <= this.maxAll) {
    //               const  temp = parseInt((Math.random() * this.max).toString());
    //               // console.log(progress.num + '<' + this.maxAll + '?:' + (progress.num <= this.maxAll));
    //               // console.log(temp);
    //               progress.num += temp; } else if (this.maxAll < progress.num && progress.num <= this.max1All) {
    //               const  temp = parseInt((Math.random() * this.max1).toString());
    //               // console.log(this.maxAll + '<' + progress.num + '<=' + this.max1All + '?:' + ( this.maxAll < progress.num && progress.num <= this.max1All));
    //               // console.log(temp);
    //               progress.num += temp; } else if (this.max1All < progress.num && progress.num <= this.max2All) {
    //               const temp = parseInt((Math.random() * this.max2).toString());
    //               // console.log(this.max1All + '<' + progress.num + '<=' + this.max2All + '?:' + ( this.max1All < progress.num && progress.num <= this.max2All));
    //               // console.log(temp);
    //               progress.num += temp;
    //           } else {
    //               const temp = parseInt((Math.random() * this.max3).toString());
    //               // console.log(this.max2All + '<' + progress.num + '<=' + 100 + '?:' + ( this.max2All < progress.num));
    //               // console.log(temp);
    //               progress.num += temp;
    //           }
    //       }
    //     }, 500);
    // }

}
