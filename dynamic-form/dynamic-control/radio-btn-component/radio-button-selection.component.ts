import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Option, ControlProperty } from '../../../models';
@Component({
    selector: 'radio-button-selection',
    template: `<div class="col-sm-12 ">
                 <div class="ques-type-section {{control.fieldLevelClass}}">
                   <h6 class="h6-label-text" *ngIf="control.placeholder && !control.label">{{control.placeholder}}</h6>
                   <button type="button" *ngFor="let option of control.options" (keypress)="keypress($event, option)" [class.active-btn]="option.value === control.value" (click)="radioBtnSelect($event, option)">
                      {{ option.value }}
                   </button>
                  </div>
                </div>
                `
})
export class RadioButtonSelectionComponent {
    @Output() radioBtnClick: EventEmitter<any> = new EventEmitter();

    @Input() control: ControlProperty;

    constructor() { }
    radioBtnSelect(event: any, option: Option, triggeredFromKeyBoard: boolean = false) {
        event.stopPropagation();
        this.radioBtnClick.emit({ event: event, param: option, triggeredFromKeyBoard: triggeredFromKeyBoard });
    }

    keypress(event: KeyboardEvent, option: Option) {
        event.stopPropagation();
        event.preventDefault();
        this.radioBtnSelect(event, option, true);
    }
}