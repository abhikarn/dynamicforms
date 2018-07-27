
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlProperty, IMyDpOptions } from '../../../models';

@Component({
    selector: 'dynamicdatepicker',
    templateUrl: './dynamic-datepicker.component.html',
})
export class DynamicDatePickerComponent {
    date = new Date();
    error: string;
    placeholder: string;
    @Input() controls: ControlProperty;
    @Output() datePickerDate: EventEmitter<any> = new EventEmitter();
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
        height: '34px',
        disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
    };
    ngOnInit() {
        this.placeholder = this.controls.placeholder;
        this.myDatePickerOptions.height = null;
        if (this.controls.value) {
            this.placeholder = <string>this.controls.value;
        }
        // let d = new Date(0);
        // d.setUTCSeconds((Number(this.controls.value)) / 1000);
        // this.selDate.month = d.getMonth();
        // this.selDate.year = d.getFullYear();
        // this.selDate.day = d.getDate();
        // } else {
        //     this.selDate = null;
        // }
    }
    onSelectionDone(event: any) {
        if (this.controls.validations[0].value && (event.date.year > (this.date.getFullYear() - +this.controls.validations[0].value))) {
            this.error = this.controls.validations[0].message;
            this.datePickerDate.emit('');
        }
        else {
            this.error = null;
            this.datePickerDate.emit(event.formatted);
        }
    }
}