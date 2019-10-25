import {Injectable, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import {  Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { _HttpClient } from '../../core/services/http.client';
import { PageInfoService } from '../pageInfo/page-info.service';
import { environment } from '../../../environments/environment';
// 基础表格，通用行为和属性
export  class  BaseTable {


    // 是否加载
    loading = false;


    // 获取数据的地址
    queryUrl: string;

    // 保存数据的链接
    saveUrl: string;

    //  修改数据的链接
    updateUrl: string;

    // 删除数据的链接

    deleteUrl;

    // 模糊查询的键值
    key: string;


    searchControl= new Subject<any>();

    constructor( public  fb: FormBuilder, public  pageInfoService: PageInfoService, public http: _HttpClient) {}


    // 模糊查询
    select = (event) => {
         this.searchControl.next( event.target.value);
    }

    //  分页加载表格数据
    getDate( params?: {[key: string]: string}): Observable<any> {

        this.loading = true;

        return this.pageInfoService.getData(`${environment.SERVER_URL + this.queryUrl}`, params);
    }

    // 删除数据
    removeDate(params: string): Observable<any> {
       return  this.http.delete(`${environment.SERVER_URL + this.deleteUrl }/${params}`)
            .do(() => this.loading = true);
    }

}
