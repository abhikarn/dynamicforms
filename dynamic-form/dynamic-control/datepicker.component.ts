import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';
import {
    FormGroup
} from '@angular/forms';
import { DatePickerDisabled } from './datepicker.disabled.model';
import { ControlProperty } from '../../models';
import { RestService } from '../../../common';
// import {IMyOptions} from 'mydatepicker';
@Component({
    selector: 'findatepicker',
    templateUrl: './datepicker.component.html'
})
export class DatePickerComponent implements OnInit {
    @Input() controls: ControlProperty;
    @Input() formGroup: FormGroup;
    @Output() checktime: EventEmitter<any> = new EventEmitter();
    @Output() selectionDone: EventEmitter<any> = new EventEmitter();
    today = new Date();
    tomorrow = new Date();
    startDate = new Date();
    @Input() anyDate = new Date();
    @Input() label: string;
    showDatepicker: boolean = false;
    currentValue = null;
    anyDateButtonValue = 'Any Date';
    maxDays = new Date();
    selectdeDate: Date;
    errorMessage: string;
    disabledDate: DatePickerDisabled[] = new Array<DatePickerDisabled>();
    holidayList: string[];
    constructor(private restService: RestService) {

    }

    showPopup() {
        if (this.formGroup.controls['modeOfContact'].value !== '') {
            if (this.showDatepicker) {
                this.showDatepicker = false;
                return;
            }
            this.showDatepicker = true;
        }
    }
    hidePopup(event: any) {
        let blurSource: HTMLElement = event.relatedTarget;
        if (!blurSource || blurSource.tagName.toLowerCase() === 'div') {
            if (this.formGroup.controls['modeOfContact'].value !== '') {
                this.showDatepicker = false;
            }
        }
    }

    ngOnInit() {
        this.restService.getData('finexpconfig', 'getconfig', 'CALL_BACK_HOLIDAY_LIST').subscribe(res => {
            this.holidayList = res.json[0].value as string[];
            let maxDays: number = this.calulateMaxDays(this.holidayList, this.today);
            this.startDate.setDate(this.today.getDate() + 2);
            this.tomorrow.setDate(this.today.getDate() + 1);
            this.anyDate.setDate(this.today.getDate() + 2);
            this.maxDays.setDate(this.today.getDate() + maxDays);
            this.disabledDate = this.getDisabledDates(maxDays);
        });


    }

    onclick(date, event, index) {
        if (index === 1 || index === 0) {
            this.anyDateButtonValue = 'Any Date';
            this.anyDate.setDate(this.today.getDate() + 2);
            this.showDatepicker = false;
        }
        if (!this.disabled(date)) {
            this.errorMessage = '';
            let dateString = this.getFormattedDate(date);
            this.checktime.emit(dateString);
            this.currentValue = date;
        }
        else {
            this.errorMessage = 'Please choose other than weekends';
        }
    }

    getClass(date, index) {
        let formValue = this.formGroup.controls[this.controls.id].value;
        if (formValue === '' || formValue === null) {
            this.currentValue = '';
            return 'btn btn-primary btn-multiselect';
        }

        if (index === 3) {
            if (this.anyDateButtonValue !== 'Any Date') {
                return 'btn btn-primary btn-multiselect selected';
            } else {
                return 'btn btn-primary btn-multiselect';
            }
        }

        if (this.getFormattedDate(this.currentValue) === this.getFormattedDate(date)) {
            return 'btn btn-primary btn-multiselect selected';
        } else {
            return 'btn btn-primary btn-multiselect';
        }
    }

    onSelectionDone(event: any) {
        this.selectdeDate = event;
        if (this.disabled(this.selectdeDate)) {
            this.errorMessage = 'Please choose other than weekends';
            this.showDatepicker = false;
            return;
        }
        this.errorMessage = '';
        this.anyDate = event;
        this.anyDate = new Date(this.getFormattedDate(this.anyDate));
        this.onclick(this.anyDate, event, 2);
        this.anyDateButtonValue = this.getFormattedDate(this.anyDate);
        this.selectionDone.emit(event);
        this.showDatepicker = false;
        return true;
    }

    getFormattedDate(date) {
        let month = (date.getMonth() + 1);
        let day = (date.getDate());
        let year = (date.getFullYear());
        return month + '/' + day + '/' + year;
    }

    public disabled(date: Date): boolean {
        return (date.getDay() === 0 || date.getDay() === 6);
    }

    public getDisabledDates(maxDays: number): DatePickerDisabled[] {
        let disabledDates: Array<DatePickerDisabled> = new Array<DatePickerDisabled>();

        this.holidayList.forEach(k => {
            let d: DatePickerDisabled = new DatePickerDisabled();
            d.date = new Date(k);
            d.mode = 'day';
            disabledDates.push(d);
        });
        for (let i: number = 0; i <= maxDays; i++) {
            let todayDate = new Date();
            let nextDate = new Date(todayDate);
            nextDate.setDate(todayDate.getDate() + i);
            if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
                let d: DatePickerDisabled = new DatePickerDisabled();
                d.date = new Date(nextDate);
                d.mode = 'day';
                disabledDates.push(d);
            }
        }
        return disabledDates;
    }
    clearData() {
        this.errorMessage = '';
        this.showDatepicker = false;
    }

    calulateMaxDays(holidayList: string[], currentDate: Date): number {
        let maxDays: number = 8;
        for (let i: number = 0; i <= maxDays; i++) {
            let nextDate: Date = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + i);
            if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
                maxDays++;
            }
            holidayList.forEach(k => {
                if (nextDate === new Date(k)) {
                    maxDays++;
                }
            });
        }
        return maxDays;
    }
}