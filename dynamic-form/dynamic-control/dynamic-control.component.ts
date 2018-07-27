import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChildren, QueryList, DoCheck, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormBuilder } from '@angular/forms';
import { DatePickerComponent } from './datepicker.component';
import { ControlProperty, ILocationDetails, FormsData } from '../../models';
import { DynamicControlService } from './dynamic-control.service';
import { CustomValidators } from '../dynamic-form.customvalidations';
// import {IMyOptions} from 'mydatepicker';
@Component({
    selector: 'dynamic-control',
    templateUrl: './dynamic-control.component.html',
    styles: [
        `.repeater-title {
                    width: 100%;
                    float: left;
                    position: relative;
                    padding: 0px 0 4px;
                    border-bottom: 1px solid @secondary-first-color;
                    color: @admin-text-color;
                    font-size: 1.4rem;
                    margin-bottom: 35px;
                    div:first-of-type {
                        padding-left: 0;
                    }
                    i {
                        float: right;
                        font-size: 1.8rem;
                        cursor:pointer;
                    }
                }`],
    encapsulation: ViewEncapsulation.None
})
export class DynamicControlComponent implements DoCheck, AfterViewInit {
    isChecked: boolean = false;
    @Input() form: FormGroup;
    @Input() control: ControlProperty;
    @Input() checkToggle?: boolean;
    @Input() isToggleActive?: boolean;
    @Input() isValidZip: boolean;
    @Input() zipDetails: ILocationDetails;
    @Output() controlChange: EventEmitter<any> = new EventEmitter();
    @Output() keypress: EventEmitter<any> = new EventEmitter();
    @Output() keydown: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() onDropdownSelectForm: EventEmitter<any> = new EventEmitter();
    @Output() toggleChange: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() multiSelect: EventEmitter<any> = new EventEmitter();
    @Output() radioBtnClick: EventEmitter<any> = new EventEmitter();
    @Output() onSearchClick: EventEmitter<string> = new EventEmitter<string>();
    @Output() onchecktime: EventEmitter<any> = new EventEmitter();
    @Output() keyupdelete: EventEmitter<any> = new EventEmitter();
    @Output() keyuppress: EventEmitter<any> = new EventEmitter();
    @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
    @Output() filtersearchinput: EventEmitter<any> = new EventEmitter();
    @Output() input: EventEmitter<any> = new EventEmitter();
    @Output() clearZipcode: EventEmitter<any> = new EventEmitter();
    @Output() searchParam: EventEmitter<any> = new EventEmitter();
    @Output() onAddControl: EventEmitter<any> = new EventEmitter();
    @Output() onSubmitRepeater: EventEmitter<any> = new EventEmitter();
    @Output() onBlurRepeater: EventEmitter<any> = new EventEmitter();
    @Output() handleSwitchControl: EventEmitter<any> = new EventEmitter();
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    @ViewChildren('inputerrors') errors: QueryList<any>;
    @ViewChild('slideToggle') slideToggle: any;
    @ViewChild('callbackDatepicker') callbackDatepicker: DatePickerComponent;
    hideErrorMsgonFocus: boolean = false;
    public showErrorFlag: boolean = true;
    public disabledButton: boolean = false;
    showDatepicker: boolean = false;
    searchKey: string;
    searchVal: string = '';
    ssnValue: string | string[] = '';
    showhide: string;
    show: boolean = false;
    private addForms: FormsData;
    constructor(private elementRef: ElementRef, private dynamicControlService: DynamicControlService, private fb: FormBuilder) {
        this.controlChange.emit(this.control);
    }
    get isValid(): boolean {
        return this.form.controls[this.control.id].valid;
    }
    ngOnInit() {
        if (this.control.controlType === 'checkbox' && this.control.value !== 'true') {
            this.control.value = null;
        }
        if (this.control.controlType === 'ssnField') {
            this.showhide = 'Show';
            this.control.unMaskedvalue = <string>this.control.value;
            this.ssnValue = this.format(true, this.control.maskFull, this.control.value.toString().replace(new RegExp('-', 'g'), ''));
        }
    }

    showSSN(control: ControlProperty) {
        if (!this.show) {
            this.showhide = 'Hide';
            this.ssnValue = this.format(false, false, this.control.value.toString().replace(new RegExp('-', 'g'), ''));
            this.show = true;
        } else {
            this.showhide = 'Show';
            this.ssnValue = this.format(true, this.control.maskFull, this.control.value.toString().replace(new RegExp('-', 'g'), ''));
            this.show = false;
        }

    }
    private format(mask: boolean, fullMask: boolean, currentValue: string) {
        //console.log('current value :' + currentValue);
        let part1: any;
        let part2: any;
        if (currentValue.length <= 3) {
            part1 = currentValue;
            if (mask) {
                part1 = part1.replace(/[0-9]/g, 'X');
            }
        } else {
            part1 = currentValue.slice(0, 3);
            part2 = currentValue.slice(3);
            if (mask) {
                part2 = part2.replace(/[0-9]/g, 'X');
            }
        }
        if (part2) {
            if (part2.length > 2) {
                if (mask) {
                    if (fullMask) {
                        part2 = part2.slice(0, 2) + '-' + part2.slice(2, 6).replace(/[0-9]/g, 'X');
                    }
                    else {
                        part2 = part2.slice(0, 2) + '-' + part2.slice(2, 6);
                    }

                } else {
                    part2 = part2.slice(0, 2) + '-' + part2.slice(2, 6);
                }
            } else {
                part2 = part2;
            }
            if (mask) {
                part1 = part1.replace(/[0-9]/g, 'X');
            }
            return (part1 + '-' + part2).trim();
        } else {
            return (part1);
        }
    }
    onkeypress(event: any) {
        this.control.value = typeof + event.target.value.replace('$', '').trim() === 'number' ? event.target.value.replace('$', '').trim().replace(/,/g, '') : event.target.value.replace('$', '').trim();
        this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
    }
    ngDoCheck(): void {
        if (this.errors) {
            this.errors.forEach(
                (error: ElementRef, i: number) => {
                    if (i === 0) {
                        error.nativeElement.className = 'error';
                    } else {
                        error.nativeElement.className = 'hide';
                    }
                });
        }
    }
    datePickerDateControl(event: any) {
        this.form.controls[this.control.id].setValue(event);
        this.control.value = event;
    }

    handleChange(event: any) {
        //console.log(event);
        if (event.checked) {
            this.control.value = 'Yes';
        }
        else {
            this.control.value = 'No';
        }
        //this.control.value = event.checked;
        this.handleSwitchControl.emit(this.control);
    }
    onchangeCheckBox(checkBoxValue) {
        if (checkBoxValue) {
            this.control.value = 'true';
            const checkedValue: boolean = new Boolean(this.control.value).valueOf();
            this.form.controls[this.control.id].setValue(checkedValue);
        } else {
            this.control.value = 'false';
            this.form.controls[this.control.id].setValue('');
        }
        this.blur.emit({ event: event, param: this.form.getRawValue(), control: JSON.stringify(this.control) });
    }
    changeValue(event: any) {
        let data = event.target.value;
        this.dynamicControlService.charCount = data.length;
    }

    ngAfterViewInit() {
        let s = document.createElement('script');
        s.text = `
                var mySlider = $("input#slider").slider({
                   ticks: [579, 679, 779, 879, 979],
                   ticks_labels: ["579 and lower", "580-679", "680-779", "780-879", "979+"],
                   ticks_tooltip : false
                });
        `;
        this.elementRef.nativeElement.appendChild(s);
        if (!!this.slideToggle) {
            this.slideToggle.checked = this.isToggleActive;
        }

        if (this.control.controlType === 'searchFilter') {
            this.setDefaultValue();
        }
    }

    onkeyup(event: KeyboardEvent) {
        if (event.keyCode === 8 || event.keyCode === 46) {
            this.keyupdelete.emit({ event: event, param: event.target });
        } else {
            this.keyuppress.emit({ event: event, param: event.target });
        }
    }
    onkeydown(event: KeyboardEvent) {
        this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
        const keyV = event.keyCode;
        if (keyV === 91 || (7 < keyV && keyV < 19) || (37 <= keyV && keyV <= 40)) {
            return;
        }
        if (!this.control.restrictionpattern) {
            return;
        }
        const pattern = new RegExp(this.control.restrictionpattern);
        //let inputChar = event.char;
        let inputChar = event.key;
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onInput(event: any) {
        this.input.emit({ event: event, param: event.target.value });
    }
    filterphone(event: KeyboardEvent) {
        // this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
        let value: string = this.form.controls[this.control.id].value;
        if (value !== null) {
            value = value.trim().replace(/[^0-9]*/g, '');
            if (value === '') {
                this.form.controls[this.control.id].setValue(value);
                return;
            }
            let city: string;
            let pNumber: string;
            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;
                default:
                    city = value.slice(0, 3);
                    pNumber = value.slice(3);
            }

            if (pNumber) {
                if (pNumber.length > 3) {
                    pNumber = pNumber.slice(0, 3) + '-' + pNumber.slice(3, 7);
                }
                else {
                    pNumber = pNumber;
                }

                this.form.controls[this.control.id].setValue((city + '-' + pNumber).trim());
            }
            else {
                this.form.controls[this.control.id].setValue(city);
            }
        }
    }

    filterSSN(event: KeyboardEvent) {
        let value: string = this.form.controls[this.control.id].value;
        if (value !== null) {
            value = value.trim().replace(/[^0-9]*/g, '');
            if (value === '') {
                this.form.controls[this.control.id].setValue(value);
                return;
            }
            let ssn: string;
            let ssnAddon: string;
            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    ssn = value;
                    break;
                default:
                    ssn = value.slice(0, 3);
                    ssnAddon = value.slice(3);
            }

            if (ssnAddon) {
                if (ssnAddon.length > 2) {
                    ssnAddon = ssnAddon.slice(0, 2) + '-' + ssnAddon.slice(2, 6);
                }
                else {
                    ssnAddon = ssnAddon;
                }

                this.form.controls[this.control.id].setValue((ssn + '-' + ssnAddon).trim());
            }
            else {
                this.form.controls[this.control.id].setValue(ssn);
            }
        }
    }

    filterDate(event: KeyboardEvent) {
        let value: string = this.form.controls[this.control.id].value;
        if (value !== null) {
            value = value.trim().replace(/[^0-9]*/g, '');
            if (value === '') {
                this.form.controls[this.control.id].setValue(value);
                return;
            }
            let date: string;
            let dateAddon: string;
            switch (value.length) {
                case 1:
                    date = value;
                    break;
                case 2:
                    if (event.keyCode === 8 || event.keyCode === 46) {
                        date = value;
                        break;
                    }
                    else {
                        date = value + '/';
                        break;
                    }
                case 3:
                    return;
                case 4:
                    if (event.keyCode === 8 || event.keyCode === 46) {
                        date = value.slice(0, 2) + '/' + value.slice(2, 4);
                        break;
                    }
                    else {
                        date = value.slice(0, 2) + '/' + value.slice(2, 4) + '/';
                        break;
                    }
                default:
                    date = value.slice(0, 2) + '/';
                    dateAddon = value.slice(2);
                    break;
            }

            if (dateAddon) {
                if (dateAddon.length > 1) {
                    dateAddon = dateAddon.slice(0, 2) + '/' + dateAddon.slice(2, 6);
                }
                else {
                    dateAddon = dateAddon;
                }

                this.form.controls[this.control.id].setValue((date + dateAddon).trim());
            }
            else {
                this.form.controls[this.control.id].setValue(date);
            }
        }
    }

    filterMessage(event: KeyboardEvent) {
        this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
        let value: string = this.form.controls[this.control.id].value;
        if (value === '') {
            this.form.controls[this.control.id].setValue(value);
            this.dynamicControlService.charCount = 0;
            return;
        }
        else if (value.length > this.control.maxlength) {
            let limit: string;
            limit = value.slice(0, this.control.maxlength);
            this.form.controls[this.control.id].setValue(limit);
            this.dynamicControlService.charCount = this.control.maxlength;
        }
        else {
            this.form.controls[this.control.id].setValue(value);
            this.dynamicControlService.charCount = value.length;
        }
    }

    filterZipcode(event: any) {
        let value: string = this.form.controls[this.control.id].value.trim().replace(/[^0-9]*/g, '');
        if (value === '') {
            this.form.controls[this.control.id].setValue(value);
            return;
        }
        let zipCode: string;
        let zipcodeAddon: string;
        switch (value.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                zipCode = value;
                break;
            default:
                zipCode = value.slice(0, 5);
                zipcodeAddon = value.slice(5);
        }
        if (zipcodeAddon) {
            if (zipcodeAddon.length > 4) {
                zipcodeAddon = zipcodeAddon.slice(0, 4);
            }
            else {
                zipcodeAddon = zipcodeAddon;
            }

            this.form.controls[this.control.id].setValue((zipCode + '-' + zipcodeAddon).trim());
        }
        else {
            this.form.controls[this.control.id].setValue(zipCode);
        }
        this.keypress.emit({ event: event, param: JSON.stringify(this.control) });
    }


    onblur(event: any) {

        this.hideErrorMsgonFocus = true;
        this.control.value = typeof + event.target.value.replace('$', '').trim() === 'number' ? event.target.value.replace('$', '').trim().replace(/,/g, '') : event.target.value.replace('$', '').trim();
        if (this.control.controlType === 'ssnField') {
            this.control.unMaskedvalue = this.form.controls[Object.keys(this.form.value)[0]].value;
            this.control.value = <string>this.control.unMaskedvalue;
        }
        this.blur.emit({ event: event, param: this.form.getRawValue(), control: JSON.stringify(this.control) });
    }

    onblurAdd(event) {
        // console.log('event ADDED');
        // console.log(event);
    }

    onfocus(event: FocusEvent) {
        this.hideErrorMsgonFocus = false;
    }
    onToggleChange(event: any) {
        this.toggleChange.emit({ event: event, param: JSON.stringify(this.control) });
    }
    onchange(event: any) {
        this.change.emit({ event: event, param: JSON.stringify(this.control) });
    }

    onDropdownSelect(value) {
        this.control.value = value;
        this.form.controls[this.control.id].setValue(value);
        this.onDropdownSelectForm.emit({ event: event, param: this.form.getRawValue(), control: JSON.stringify(this.control) });
    }

    onMultiSelectclick(value) {
        this.control.value = value;
        this.form.controls[this.control.id].setValue(value);
        this.multiSelect.emit({ cID: this.control.id, cValue: value });
    }

    onRadioBtnclick(event: any) {
        const prevalue: string | ILocationDetails = this.control.value;
        this.control.previousValue = prevalue;
        let value = event.param.value;
        this.control.value = value;
        this.form.controls[this.control.id].setValue(value);
        this.radioBtnClick.emit({ event: event, param: event.param, triggeredFromKeyBoard: event.triggeredFromKeyBoard, control: JSON.stringify(this.control) });
    }

    checktime(value) {
        this.form.controls[this.control.id].setValue(value);
        this.onchecktime.emit({ cID: this.control.id, cValue: value });
    }

    onsearch(event: any) {
        event.target.blur(); // to remove focus from input box on click of ENTER
        let value = this.form.controls[this.control.id].value;
        this.onSearchClick.emit(value);
    }

    onClickEdit(event, controlId: string) {
        //this.form.setErrors(null);
        let ctrl = this.form.get(controlId);
        ctrl.enable();
        //if (this.form.valid) {
        //ctrl.enabled ? ctrl.disable() : ctrl.enable();
        // this.control.readOnly = true;
        this.control.readOnly = this.control.readOnly ? false : true;
        //}
        //if (!ctrl.enabled) {
        if (!this.control.readOnly) {
            this.dynamicControlService.isChecked = true;
        }
        else {
            this.dynamicControlService.isChecked = false;
        }
    }

    onLocationSelect(event: any) {
        //let zipCode = !!event.zipcode ? event.zipcode : '';
        //let stateCode = !!event.stateCode ? event.stateCode : '';
        setTimeout(() => {
            let value: ILocationDetails;
            if (event) {
                if (!event.resetFormGroup) {
                    value = {
                        stateName: !!event.stateName ? event.stateName : '',
                        cityName: !!event.cityName ? event.cityName : '',
                        countyName: !!event.countyName ? event.countyName : '',
                        postalCode: !!event.postalCode ? event.postalCode : '',
                        stateCode: !!event.stateCode ? event.stateCode : ''
                    };
                }
                else {
                    value = null;

                }
            } else {
                value = null;
            }
            this.form.controls[this.control.id].setValue(value);
            //console.log(this.form.controls[this.control.id].value);
            //console.log(this.form.controls[this.control.id].valid);
            this.control.value = value;
            this.selectedLocation.emit(value);
        }, 0);
    }

    clearSearch(event: any) {
        this.onClear.emit(event);
        this.form.controls[this.control.id].setValue(null);
    }

    filterSearchInput(event: KeyboardEvent) {
        this.filtersearchinput.emit(this.form.controls[this.control.id]);
    }

    onClearZipcode() {
        this.clearZipcode.emit();
    }
    searchClickForm(event) {
        this.searchParam.emit({ searchInitiated: true, value: this.form.controls[this.control.id].value, key: this.searchKey });
    }

    setSearchKey(key, value) {
        this.searchKey = key;
        this.searchVal = value;
        this.searchParam.emit({ searchInitiated: false, value: this.searchVal, key: this.searchKey });
    }

    addControl(event) {
        let formsdata: FormsData = <FormsData>JSON.parse(JSON.stringify(this.control.repeater[0]));
        // console.log(formsdata);
        formsdata.controls = formsdata.controls.filter((f) => f.controlType !== 'repeater');
        this.formDataControl(formsdata);
        let formGroup: FormGroup = this.createFormGroup(formsdata.controls);
        this.control.repeater.push(formsdata);
        (<FormArray>(this.form.controls['repeater'])).controls.push(formGroup);
        // console.log(this.control);
        // console.log('form Grouop');
        // console.log(formGroup);
    }

    formDataControl(formsdata: FormsData, hide?: boolean, repeaterType?: RepeaterType) {
        let index: number = formsdata.controls.length + 1;
        formsdata.controls.forEach((control: ControlProperty) => {
            if (control.controlType === 'repeater') {
                console.log(`repeater data: ==> Started`);
                control.controlType = 'repeater';
                switch (repeaterType) {
                    case RepeaterType.ideal:
                        control.repeater.forEach((r) => {
                            this.formDataControl(r, true);
                        });
                        break;
                    case RepeaterType.onlyFirst:
                        this.formDataControl(control.repeater[0], true);
                        break;
                    default:
                        control = undefined;
                        break;
                }
            } else {
                control.id = index.toString();
                control.value = '';
                control.hideElement = hide;
                // console.log(control.id + ": " + control.value);
                index++;
            }
        });
        return formsdata;
    }

    public createFormControl(control: ControlProperty) {
        return this.fb.control({ value: '', disabled: control.isEnabled }, CustomValidators.setValidators(null, control));
    }

    public createFormArrayGroup(control: FormsData[], repeaterType?: RepeaterType): FormArray {
        if (!!control) {
            const groupArray = this.fb.array([]);
            switch (repeaterType) {
                case RepeaterType.ideal:
                    control.forEach((form: FormsData) => {
                        groupArray.push(this.createFormGroup(form.controls));
                    });
                    break;
                case RepeaterType.onlyFirst:
                    groupArray.push(this.createFormGroup(control[0].controls));
                    break;
                default:
                    break;
            }
            return groupArray;
        }
    }

    public createFormGroup(controls: ControlProperty[]): FormGroup {
        if (!!controls) {
            // console.log(controls);
            let index: number = controls.length + 1;
            const group = this.fb.group({});
            controls.forEach((control) => {
                if (control.controlType === 'repeater') {
                    group.addControl('repeater', this.createFormArrayGroup(control.repeater));
                } else {
                    group.addControl(index.toString(), this.createFormControl(control));
                    index++;
                }
            });
            return group;
        }
    }

    public removeControl(event: any, index: number, fg: FormGroup, ct: ControlProperty) {
        this.control.repeater.splice(index, 1);
        (<FormArray>(this.form.controls['repeater'])).removeAt(index);
    }

    public submitRepeater(event) {
        this.onSubmitRepeater.emit({ event: event, param: JSON.stringify(this.form.value), formGrp: this.form });
    }

    public blurRepeater(event: any) {
        // alert('blur');
        this.hideErrorMsgonFocus = true;
        this.control.value = event.target.value;
        //  typeof + event.target.value.replace('$', '').trim() === 'number' ? event.target.value.replace('$', '').trim().replace(/,/g, '') : event.target.value.replace('$', '').trim();
        this.onBlurRepeater.emit({ event: event, param: this.form.getRawValue(), control: JSON.stringify(this.control) });
    }
    setDefaultValue() {
        for (let i = 0; i < this.control.options.length; i++) {
            if (this.control.options[i].selected) {
                this.searchKey = this.control.options[i].value;
                this.searchVal = this.control.options[i].name;
                return;
            }
        }
    }
    onFromToSelection(event: any) {
        this.control.value = !!event.param ? event.param : null;
    }

}
export enum RepeaterType {
    ideal,
    onlyFirst,
    noRepeater
}
