import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-footer-info',
    templateUrl: './footer-info.component.html',
    styleUrls: ['./footer-info.component.css']
})
export class FooterInfoComponent implements OnInit {
    footer_info = ' <nav> <a href=\'#\' target=\'_blank\'  >关于我们</a> <span >|</span> <a href=\'#\' target=\'_blank\'>联系我们</a> <span >|</span> <a href=\'#\' target=\'_blank\'>法律声明</a> </nav><p>Copyright &copy; 2018 张贝 All Rights Reserved.<br>Powered &nbsp;by&nbsp;个人博客后台<br><a href=\'http://www.miitbeian.gov.cn/\' target=\'_blank\' rel=\'nofollow\'>鲁ICP备18036319号</a> <br></p> ';
    constructor() {
    }

    ngOnInit() {
    }

}
