import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
         HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
         HttpHeaders } from '@angular/common/http';
import { NzMessageService, NzNotificationService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { TokenService } from './token.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import swal, { SweetAlertType } from 'sweetalert2';

import { environment } from '../../../../environments/environment';
import { POSTSTATUS } from '../../services/http.client';


/**
 * TOKEN拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public injector: Injector) {}

    // 是否是服务器请求
    public isServer(url: string) {
        return url.startsWith(environment.SERVER_URL) || url.includes(environment.SERVER_URL);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // let header: HttpHeaders = null;
        // let url = req.url;
        // let body;
        // let params;
        //
        // let status: number = parseInt(req.params.get('sendStatus'));
        // params =  req.params.delete('sendStatus');
        //
        // let newReq ;
        // // 统一对服务端请求处理
        // if (this.isServer(url)) {
        //     // 设置链接前缀
        //     //  url = environment.SERVER_URL + url;
        //     //  设置跨域请求头
        //     req.headers.set("Access-Control-Allow-Origin","*")
        //
        //      if(req.method === "POST")
        //          switch (status) {
        //
        //             case POSTSTATUS.JSON:
        //                  header = req.headers.set('Content-Type', 'application/json;charset=UTF-8 ');
        //                  newReq = req.clone({
        //                    url: url,
        //                    params: params,
        //                  });
        //                 break;
        //             case POSTSTATUS.SERIALIZE:
        //                  // 服务器请求设置为表单提交
        //                 header = req.headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8 ');
        //                 body = req.body;
        //                 newReq = req.clone({
        //                     params: params,
        //                     headers: header,
        //                     body: $.param(body),
        //                     url: url
        //                  });
        //                 break;
        //             case POSTSTATUS.DATA:
        //                  // header = req.headers.set('Content-Type', 'multipart/form-data');
        //
        //                newReq = req.clone({
        //                    url: url,
        //                    // headers: header,
        //                    params: params,
        //                  });
        //                 break;
        //             default:
        //                 header = req.headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8 ');
        //                 body = req.body;
        //                 newReq = req.clone({
        //                        url: url,
        //                        headers: header,
        //                        params: params,
        //                        body: $.param(body)
        //                      });
        //
        //                 break;
        //         }
        //       else
        //           newReq = req.clone({
        //                     params: params,
        //                     url: url
        //                 });
        //
        // } else {
        //       newReq = req.clone({
        //                     params: params,
        //                     url: url
        //                 });
        // }

        // // let newReq ;
        // if (body) {
        //    newReq = req.clone({
        //         headers: header,
        //         body: $.param(body),
        //         url: url
        //     });
        // } else
        //     newReq = req.clone({
        //         headers: header,
        //         url: url
        //     });

        // 过滤授权与多assets请求
            // console.log($.isNumeric(12))
            // if (!req.url.includes('auth/') && !req.url.includes('assets/')) {
            // 可以进一步处理，比如：重新刷新或重新登录
            // const authData = this.injector.get(TokenService).data;
            // if (!authData.access_token) {
            //     this.goLogin();
            //     return Observable.create(observer => observer.error({ status: 401 }));
            // }
            // 正常token值放在请求header当中，具体格式以后端为准
            // header = req.headers.set('Authorization', `Bearer ${authData.access_token}`);
            // }

            // 过滤向后台的请求
            // if (this.isServer(url)) {
            //     const authData = this.injector.get(TokenService).data;
            // 正常token值放在请求header当中，具体格式以后端为准
            // header.set('Authorization', `Bearer ${authData.access_token}`);
            // if ( body instanceof Object) {
            //     Object.assign(body, {'language': this.injector.get(TranslatorService).getCurrentLang()});
            // }
            // }

        return next
                .handle(req).pipe(
                  mergeMap((event: any) => {
                    // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                   // 后台业务错误
                   if ( event instanceof  HttpResponse && this.isServer(event.url) && !event.body.status ) {
                        return Observable.create(observer => observer.error(event));
                   }
                    // 若一切都正常，则后续操作
                    return of(event);
                }),
                catchError((res: HttpResponse<any>) => {
                    // 一些通用操作
                    switch (res.status) {
                        case 401: // 未登录状态码
                            this.injector.get( NzMessageService).error(res['error'].result.message);
                            break;
                        case 200:
                            // 业务层级错误处理
                            swal({type: 'error', title: `${res.body.result.message}`});
                            // this.injector.get( NzMessageService).error(res.body.result.message);
                            break;
                        case 404:
                            this.injector.get( NzMessageService).error(`请求${res.url}错误`);
                            console.log('404');
                            break;
                        default:
                            this.injector.get( NzMessageService).error('未知错误');
                            console.log('未知错误');
                            break;
                    }
                    // 以错误的形式结束本次请求
                    return Observable.throw(res);
                })
        );
    }
}


