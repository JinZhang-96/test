import {Injectable} from '@angular/core';
import {_HttpClient} from '@core/services/http.client';
import  * as areasData from '../../../../assets/js/area.js'




const areas = areasData.data
@Injectable()
export class MapDataService {
	 // 验证参数
    private datas: any[] = [];
    private dataNum: any = 0;
    private dataNames: any[] = [];
    private url: string = "https://map.baidu.com/?newmap=1&reqflag=pcmap&biz=1&from=webmap&da_par=direct&pcevaname=pc4.1&qt=spot&from=webmap&c={cityCode}&wd={keyWord}&wd2=&pn={pageNumber}&nn={startNumber}&db=0&sug=0&addr=0&&da_src=pcmappg.poi.page&on_gel=1&src=7&gr=3&l=12&rn=50&tn=B_NORMAL_MAP&ie=utf-8&t={time}";   

    constructor() {    	 

    }
    





     setCityData(provinceId) {
                $("#areaName").html("");
                    var url = "https://map.baidu.com/?newmap=1&reqflag=pcmap&biz=1&from=webmap&da_par=direct&pcevaname=pc4.1&qt=s&da_src=searchBox.button&wd=%E5%85%AC%E5%8F%B8&c={id}&src=0&wd2=&pn=0&sug=0";
                    url = url.replace("{id}", provinceId);
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "jsonp",
                        success: (data) => {
                            var content = data["content"];
                            var more_city = data["more_city"][0]["city"];
                            if (content instanceof Array && content.length > 0) {
                                content.forEach(function(cityObj) {
                                    $("<option></option>").val(cityObj["code"]).attr("geo", cityObj["geo"]).html(cityObj["name"]).appendTo($("#areaName"));
                                });
                            }
                            if (more_city instanceof Array && more_city.length > 0) {
                                more_city.forEach(function(cityObj) {
                                    $("<option></option>").val(cityObj["code"]).attr("geo", cityObj["geo"]).html(cityObj["name"]).appendTo($("#areaName"));
                                });
                            }
                        }
                    })
     }


     initProvinces() {
                    let url = "https://map.baidu.com/?newmap=1&reqflag=pcmap&biz=1&from=webmap&da_par=direct&pcevaname=pc4.1&qt=s&da_src=searchBox.button&wd=%E5%85%AC%E5%8F%B8&c=1&src=0&wd2=&pn=0&sug=0";
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "jsonp",
                        success: (data) => {
 
                            var provinces = data["more_city"];
                            if (provinces instanceof Array && provinces.length > 0) {
                                provinces.forEach(function(dataObj) {
                                    if (dataObj["province"] == "重庆市" || dataObj["province"] == "天津市" || dataObj["province"] == "香港特别行政区") {
                                        $("<option></option>").val(dataObj["province_id"]).attr("geo", dataObj["city"][0]["geo"]).html(dataObj["province"]).appendTo($("#provinceName"));
                                    } else {
                                        $("<option></option>").val(dataObj["province_id"]).html(dataObj["province"]).appendTo($("#provinceName"));
                                    }
                                });
                                if ($.inArray("北京市", provinces) == -1) {
                                    $("<option></option>").val("131").attr("geo", "1|12959238.56,4825347.47;12959238.56,4825347.47|12959238.56,4825347.47;").html("北京市").appendTo($("#provinceName"));
                                }
                                if ($.inArray("上海市", provinces) == -1) {
                                    $("<option></option>").val("289").attr("geo", "1|13523265.31,3641114.64;13523265.31,3641114.64|13523265.31,3641114.64;").html("上海市").appendTo($("#provinceName"));
                                }
                                //默认广东省
                                $("#provinceName").val('7');
                                this.setCityData("7");
                            }
                        }
                    })
     }


    initEvent() {
                $("#btnSearchData").click(() => {
                    var provinceName = $("#provinceName").find("option:selected").text();
                    var cityCode = "";
                    var cityName = "";
                    if (provinceName == "重庆市" || provinceName == "天津市" || provinceName == "香港特别行政区" || provinceName == "北京市" || provinceName == "上海市") {
                        cityCode = $("#provinceName").val();
                        cityName = provinceName;
                    } else {
                        cityCode = $("#areaName").val();
                        cityName = $("#areaName").find("option:selected").text();
                    }
                    var keyWord = $("#keyWord").val();
                    var number = parseInt($("#number").val());
                    number = number > 50 ? number : 50;
                    var len = number % 50 == 0 ? (number / 50) : (number / 50 + 1);
                    this.datas = [];
                    this.dataNum = 0;
                    if (cityCode && keyWord) {
                        for (var i = 1; i <= len; i++) {
                            this.getData(cityName, cityCode, keyWord, i, number);
                        }
                    } else {
                        alert("请输入关键字或选择城市");
                    }
                });
                $("#btnExportData").click(() => {
                    var fileName = "地图采集信息_" + new Date().format('yyyyMMddhhmmss');
                    $('#tableList').bootstrapTable('togglePagination');
                    $('#tableList').tableExport({
                        fileName: fileName,
                        type: 'csv'
                    });
                    $('#tableList').bootstrapTable('togglePagination');
                });
                $("#provinceName").change(() => {
                    var provinceName = $("#provinceName").find("option:selected").text();
                    if (provinceName == "重庆市" || provinceName == "天津市" || provinceName == "香港特别行政区" || provinceName == "北京市" || provinceName == "上海市") {
                        $("#areaName").html("");
                        return;
                    }
                    this.setCityData($(this).val());
                });
         }


          

         initTable() {
                let height = document.body.clientHeight - 5;
                let columns: any[] = [{
                    field: "name",
                    title: "名称",
                    align: "center"
                }, {
                    field: "addr",
                    title: "地址",
                    align: "center"
                }, {
                    field: "tel",
                    title: "电话",
                    align: "center"
                }, {
                    field: "di_tag",
                    title: "标签",
                    align: "center"
                }, {
                    field: "area_name",
                    title: "地区",
                    align: "center"
                }];

                console.log($("#tableList"))

                $("#tableList").bootstrapTable({
                    data: [],
                    striped: true,
                    height: height,
                    pageNumber: 1, //初始化加载第一页，默认第一页
                    pagination: true,
                    pageSize: 20, //每页的记录行数（*）
                    pageList: [10, 20, 50, 100],
                    exportDataType: 'all',
                    columns: columns
                });
        }


       getArea(cityName: string):any {
                let areaDatas = [];
                let codes = [];
                let code;

                if (cityName == "香港特别行政区") {
                    areaDatas.push("香港 特别行政区");
                    return areaDatas;
                }
                if (cityName == "澳门特别行政区") {
                    areaDatas.push("澳门特别行政区");
                    return areaDatas;
                }
                for (let i = 0; i < areas.length; i++) {
                    if (areas[i]["name"] == cityName) {
                        code = areas[i]["code"];
                        break;
                    }
                }
                if (cityName == "重庆市" || cityName == "天津市" || cityName == "北京市" || cityName == "上海市") {
                    for (var i = 0; i < areas.length; i++) {
                        if (areas[i]["parentCode"] == code) {
                            codes.push(areas[i]["code"]);
                        }
                    }
                    for (var i = 0; i < codes.length; i++) {
                        for (var j = 0; j < areas.length; j++) {
                            if (areas[j]["parentCode"] == codes[i]) {
                                areaDatas.push(areas[j]["name"]);
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < areas.length; i++) {
                        if (areas[i]["parentCode"] == code && areas[i]["name"] != "市辖区") {
                            areaDatas.push(areas[i]["name"]);
                        }
                    }
                }
                return areaDatas;
        }





        getData(cityName, cityCode, keyWord, pageNumber, max) {
                var areaDatas = this.getArea(cityName);
                for (var j = 0; j < areaDatas.length; j++) {
                    var tempUrl = this.url;
                    var startNumber = (pageNumber - 1) * 50;
                    var tempkeyWord = areaDatas[j] + " " + keyWord;                    
                    
                    tempUrl = tempUrl.replace("{cityCode}", cityCode).replace("{keyWord}", tempkeyWord).replace("{pageNumber}", pageNumber).replace("{startNumber}", `${startNumber}`).replace("{time}", `${new Date().getTime()}`);
                    
                    $.ajax({
                        type: "get", //请求方式
                        async: true, //是否异步
                        url: tempUrl,
                        dataType: "jsonp", //跨域json请求一定是jsonp
                        success: (data) => {
                            //请求成功处理，和本地回调完全一样
                            var content = data["content"];

                            if (!content)
                                return;
                            for (var i = 0; i < content.length; i++) {
                                var obj = content[i];
                                var dataObj = {};
                                if (this.dataNum >= max) {
                                    break;
                                }
                                if ($.inArray(obj["name"], this.dataNames) == -1 && obj["tel"]) {
                                    dataObj["name"] = obj["name"];
                                    dataObj["addr"] = obj["addr"];
                                    dataObj["tel"] = obj["tel"];
                                    dataObj["di_tag"] = obj["di_tag"];
                                    dataObj["area_name"] = obj["area_name"];
                                    this.dataNames.push(obj["name"]);
                                    this.datas.push(dataObj);
                                    this.dataNum++;
                                }
                            }
                            $("#tableList").bootstrapTable("load", this.datas);
                        },
                        complete: function() {
                            //请求完成的处理

                        },
                        error: function() {
                            //请求出错处理
                        }
                    });
                }
            }


}
