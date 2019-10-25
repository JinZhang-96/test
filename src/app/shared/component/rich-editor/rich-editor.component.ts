import {Component, OnInit, AfterViewInit, OnDestroy, forwardRef, EventEmitter, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import { fromEvent } from 'rxjs/observable/fromEvent';

import * as tinymce from 'tinymce';
// A theme is also required
import 'tinymce/themes/modern/theme';
// langugae file
import 'tinymce/langs/zh_CN';
// Any plugins you want to use has to be imported
// import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
// // import 'tinymce/plugins/bbcode'; // When using PunBB dialect, codeStyle and quoteStyle will be converted to [code] and [quote] correspondingly.
// import 'tinymce/plugins/charmap';
// import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/codesample';
// import 'tinymce/plugins/contextmenu';
// import 'tinymce/plugins/directionality';
// import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullpage';
import 'tinymce/plugins/fullscreen';
// import 'tinymce/plugins/help';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/legacyoutput';
import 'tinymce/plugins/link';
// import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
// import 'tinymce/plugins/nonbreaking';
// import 'tinymce/plugins/noneditable';
// import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/paste';
// import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
// import 'tinymce/plugins/save';
// import 'tinymce/plugins/searchreplace';
// import 'tinymce/plugins/spellchecker';
// import 'tinymce/plugins/tabfocus';
import 'tinymce/plugins/table';
// import 'tinymce/plugins/template';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/textpattern';
// import 'tinymce/plugins/toc';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';







@Component({
    selector: 'app-rich-editor',
    templateUrl: './rich-editor.component.html',
    styleUrls: ['./rich-editor.component.less'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RichEditorComponent),
        multi: true
    }]
})
export class RichEditorComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    editor = null;

    //  预留字段， 用来获取文章中的图片路径， 由于图片删除事件无法监听,所以暂时不使用
    @Output('images') event =  new EventEmitter<string[]>();
    value = null;

    position = 120;

    images: string[] = [];

    init = {
        selector: '#editor',
        max_height: 800,
        branding: false, // 是否禁用底部驱动显示
        skin_url: 'assets/lib/tinymce/skins/lightgray', // 皮肤路经径
        // fixed_toolbar_container: '#mytoolbar',
        // toolbar_location : "top",
        // //定义工具栏工具的对其方式
        // toolbar_align : "center",
        // statusbar: false,  // 禁用状态栏，statusbar选项应该提供一个布尔false值
        // resize: 'both', // 设置是否允许调整大小
        menu: {
            file: {title: 'File', items: 'newdocument | preview | print textpattern'},
            edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
            insert: {
                title: 'Insert',
                items: 'image link media emoticons | template hr codesample inserttable | charmap | pagebreak nonbreaking anchor table toc | insertdatetime'
            },
            view: {title: 'View', items: 'code |  visualchars visualblocks | spellchecker | preview fullscreen'},
            format: {
                title: 'Format',
                items: 'bold italic underline strikethrough superscript subscript code fontsizeselect fontselect forecolorpicker | formats | formatselect align | removeformat'
            },
            table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
            tools: {title: 'Tools', items: 'template | code | sourcecode | accessibilitychecker'},
            help: {title: 'Help', items: 'help'}
        },
        menubar: 'file edit insert view format table tools help',
        //     // elementpath: false, // 允许您在编辑器的底部禁用状态栏中的元素路径。
        plugins: 'anchor autolink autoresize autosave  code codesample   fullpage fullscreen hr image imagetools importcss insertdatetime link media  paste print table textcolor textpattern  wordcount',
        /*
                advlist  charmap contextmenu directionality  emoticons colorpicker help legacyoutput lists nonbreaking  template noneditable pagebreak save searchreplace spellchecker preview tabfocus toc visualblocks visualchars
         */
        toolbar: 'insert | undo redo | fontselect  fontsizeselect emoticons formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
        // image_advtab: true,
        templates:
            [
                {title: 'Test template 1', content: 'Test 1'},
                {title: 'Test template 2', content: 'Test 2'}
            ],
        codesample_content_css: 'assets/lib/prism/prism.css',
        // 'assets/',
        // 'assets/prism/prism.css',
        automatic_uploads: false,
        images_reuse_filename: true,
        images_upload_handler: (blobInfo, success, failure) => {
            let xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', `${environment.SERVER_URL}pf/upload`);

            xhr.onload = () => {
                let json;

                if (xhr.status !== 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }

                json = JSON.parse(xhr.responseText);

                if (!json || typeof json.datas.location !== 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.datas.location);

                this.images.push(json.datas.location);

                this.event.emit(this.images);
            };

            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
        },
        element_format : 'html',
        encoding: 'html'
        // fixed_toolbar_container: 'header',
        // setup: (editor) =>  {
        //     this.editor = editor;
        // editor.on('keyup change', (e) => {
        //     this.propagateChange(editor.getContent());
        // }  )
        // }

        //     // spellchecker spellcheckerlanguage
        //     // preview_styles: false,
        //     // language_url: 'assets/tinymce/langs/zh_CN.js'， // 语言文件路径
        //     // theme_url: 'assets/tinymce/themes/modern/theme.js', //  风格文件路径
    } ;


    propagateChange = (_: any) => {};


    constructor() {
    }

    ngOnInit() {

        // fromEvent(window, 'scroll')
        // .throttleTime(200).subscribe((next) =>{
        //     if(document.getElementsByClassName('mce-container-body mce-stack-layout')[0].getElementsByTagName("div")[0].getBoundingClientRect().top < this.position) {
        //         $('#mceu_20').css({"position": "fixed", "top": this.position});
        //     }
        //     if(document.getElementsByClassName('mce-container-body mce-stack-layout')[0].getBoundingClientRect().top > this.position) {
        //         $('#mceu_20').removeAttr("style");
        //     }
        // });
    }


    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        // 销毁编辑器
        // tinymce.remove(this.editor);
    }

}
