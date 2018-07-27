import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { ControlProperty, IFromTo, IFromToOptions } from '../../../models';

export const CUSTOM_FROM_TO_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FromToComponent),
    multi: true
};

@Component({
    selector: 'finx-from-to',
    template: `
    <div>
      <h6 class="h6-label-text">{{fromToDatePickerOptions && fromToDatePickerOptions.fromLabel}}</h6>
      <div *ngIf="fromToDatePickerOptions && fromToDatePickerOptions.showPresentInFromField">Present</div>
      <my-date-picker *ngIf="fromToDatePickerOptions && !fromToDatePickerOptions.showPresentInFromField" [options]="fromDatePickerOptions" [placeholder]="control.placeholder" (dateChanged)="onFromDateSelection($event)" required></my-date-picker>
    </div>
    <div>
      <h6 class="h6-label-text">{{fromToDatePickerOptions && fromToDatePickerOptions.toLabel}}</h6>
      <div *ngIf="fromToDatePickerOptions && fromToDatePickerOptions.showPresentInToField">Present</div>
      <my-date-picker *ngIf="fromToDatePickerOptions && !fromToDatePickerOptions.showPresentInToField" [options]="toDatePickerOptions" [placeholder]="control.placeholder" (dateChanged)="onToDateSelection($event)" required></my-date-picker>
    </div>
`,
    providers: [CUSTOM_FROM_TO_CONTROL_VALUE_ACCESSOR]
})
export class FromToComponent implements OnInit, OnChanges, ControlValueAccessor {
    date = new Date();
    fromDatePickerOptions: IMyOptions;
    toDatePickerOptions: IMyOptions;
    mydatepickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy'
    };
    fromToDatePickerOptions: IFromToOptions = {
        fromLabel: 'From',
        toLabel: 'To',
        isFuturePickable: true,
        isPastPickable: true,
        showPresentInFromField: false,
        showPresentInToField: false,
        datepickerOptions: this.mydatepickerOptions
    };
    selectedFromTo: IFromTo = {
        from: null,
        to: null
    };

    @Input() control: ControlProperty;
    @Input() formControl: FormControl;

    @Output() fromToSelected: EventEmitter<any> = new EventEmitter<any>();

    getCopyOfDatePickerOptions(option: IMyOptions): IMyOptions {
        return JSON.parse(JSON.stringify(option));
    }
    checkAndEmit() {
        if (!this.hasNull(this.selectedFromTo)) {
            this.formControl.setValue(this.selectedFromTo);
            this.fromToSelected.emit({ event: null, param: this.selectedFromTo });
        }
    }
    hasNull(obj: any): boolean {
        for (let key in obj) {
            if (obj[key] === null) {
                return true;
            }
        }
        return false;
    }

    writeValue() { }

    registerOnChange() { }

    registerOnTouched() { }

    ngOnInit() {
        if (!!this.control && !!this.control.fromToDatePickerOptions) {
            this.fromToDatePickerOptions = this.control.fromToDatePickerOptions;
            let copyMydatepickerOptions: IMyOptions = this.getCopyOfDatePickerOptions(this.fromToDatePickerOptions.datepickerOptions);
            //to disable future dates
            if (!this.fromToDatePickerOptions.isFuturePickable) {
                copyMydatepickerOptions.disableSince = {
                    day: this.date.getDay() + 1,
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear()
                };
            }
            //to disable past dates
            if (!this.fromToDatePickerOptions.isPastPickable) {
                copyMydatepickerOptions.disableUntil = {
                    day: this.date.getDay() + 1,
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear()
                };
            }
            this.mydatepickerOptions = copyMydatepickerOptions;
        }
        this.fromDatePickerOptions = this.toDatePickerOptions = this.mydatepickerOptions;

    }

    ngOnChanges(changes: SimpleChanges) {

    }


    onFromDateSelection(event: IMyDateModel) {
        this.selectedFromTo.from = event.formatted;
        let copyToDatePickerOptions = this.getCopyOfDatePickerOptions(this.toDatePickerOptions);
        copyToDatePickerOptions.disableUntil = event.date;
        this.toDatePickerOptions = copyToDatePickerOptions;
        this.checkAndEmit();
    }
    onToDateSelection(event: IMyDateModel) {
        this.selectedFromTo.to = event.formatted;
        let copyFromDatePickerOptions = this.getCopyOfDatePickerOptions(this.fromDatePickerOptions);
        copyFromDatePickerOptions.disableSince = event.date;
        this.fromDatePickerOptions = copyFromDatePickerOptions;
        this.checkAndEmit();
    }
}