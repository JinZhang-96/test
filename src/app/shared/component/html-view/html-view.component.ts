import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ElementRef,
    Renderer2
} from '@angular/core';
import * as Prism from 'prism/prism.js';

@Component({
    selector: 'app-html-view',
    template: ``,
    styleUrls: ['./html-view.component.less']
})
export class HtmlViewComponent implements OnInit, AfterViewInit {

    @Input('HTML') html = null;


    constructor(private r: Renderer2, private el: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.r.setProperty(this.el.nativeElement, 'innerHTML', this.html);
        // $(this.el.nativeElement).find('pre').each(function () {
            Prism.highlightAll(false);
            // Prism.highlightElement(this , false);
        // });
    }

    // escapeHtml(unsafe) {
    //     return unsafe
    //         .replace(/&/g, '&amp;')
    //         .replace(/</g, '&lt;')
    //         .replace(/>/g, '&gt;')
    //         .replace(/"/g, '&quot;')
    //         .replace(/'/g, '&#039;');
    // }

}
