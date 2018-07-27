import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'ckeditor-cmp',
    templateUrl: './ckeditor.component.html'
})
export class CkEditorComponent implements OnInit {
    isNotValid = false;
    showTestmValidation = false;
    ckEditorConfig: any;
    @Input() required: boolean = false;
    @Input() content: string;
    @Output() changeValue = new EventEmitter();
    @Output() testmRequired = new EventEmitter();
    @Output() onblur = new EventEmitter();
    @Input() maxLength: number;

    constructor() { }

    ngOnInit() {
        this.ckEditorConfig = {
            extraPlugins: 'wordcount',
            removePlugins: 'elementspath, resize',
            //resize_enabled: false,
            wordcount: {
                showParagraphs: false,
                showWordCount: false,
                showCharCount: true,
                countSpacesAsChars: true,
                countHTML: false,
                maxWordCount: -1,
                maxCharCount: this.maxLength,
                pasteWarningDuration: 2000
            },
            height: '80px',
            width: '100%',
            toolbar: [
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
                { name: 'links', items: ['Link', 'Unlink'] },
            ]
        };
    }

    change() {
        let testData = this.content.trim().replace(/<[^>]*>|/g, '');
        if (this.required && (!testData || testData === '')) {
            this.isNotValid = true;
        } else {
            this.isNotValid = false;
        }
        this.changeValue.emit(this.content);
    }

    blur() {
        let testData = this.content.trim().replace(/<[^>]*>|/g, '');
        if (this.required && (!testData || testData === '')) {
            this.showTestmValidation = true;
        } else {
            this.showTestmValidation = false;
        }
        this.testmRequired.emit(this.content);
    }

}