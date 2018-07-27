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

import { ControlProperty, Option } from '../../models';
import { SharedService } from './../../../common/services/shared-services/shared-service';
// import {IMyOptions} from 'mydatepicker';
@Component({
    selector: 'multiselect-select',
    templateUrl: './multiselect.component.html'
})
export class MultiSelectComponent implements OnInit {

    @Input() control: ControlProperty;
    @Input() formGroup: FormGroup;
    @Output() onMultiSelectclick: EventEmitter<any> = new EventEmitter();
    currentValue = '';
    isSingleSelect = true;
    selectedValues: Array<String> = [];
    constructor(private sharedService: SharedService) {
    }
    ngOnInit() {
        if (this.control && this.control.value) {
            this.selectedValues = (<string>this.control.value).split(',');
        }
        if (this.control.allowMultiSelect) {
            this.isSingleSelect = false;
        }
    }

    onclick(option, event) {
        let value = option.value;
        if (option.resetOption) {
            this.selectedValues = [];
            this.selectedValues.push(value);
        }
        else {
            let resetOption: Option = this.control.options.find((item) => item.resetOption === true);
            if (resetOption) {
                let resetValue: number = this.selectedValues.findIndex((item) => item === resetOption.value);
                if (resetValue > -1) {
                    let index = this.selectedValues.indexOf(resetOption.value);
                    this.selectedValues.splice(index, 1);
                }
            }

            if (this.isAvailable(value)) {
                let index = this.selectedValues.indexOf(value);
                this.selectedValues.splice(index, 1);
            } else {
                if (this.isSingleSelect) {
                    this.selectedValues = [];
                }
                this.selectedValues.push(value);
            }
        }
        this.currentValue = this.selectedValues.join();
        this.formGroup.controls[this.control.id].markAsTouched({onlySelf: true});
        this.onMultiSelectclick.emit(this.currentValue);
    }

    getClass(optionValue) {
        let formValue = this.formGroup.controls[this.control.id].value;
        //console.log(this.formGroup.controls[this.controls.id].hasError('required'));
        // this.formGroup.controls[this.controls.id].setErrors({ 'required': true });
        if (formValue === '' || formValue === null) {
            this.currentValue = '';
            this.selectedValues = [];
            return 'btn btn-primary btn-multiselect';
        }
        if (this.isAvailable(optionValue)) {
            return 'btn btn-primary btn-multiselect selected';
        } else {
            return 'btn btn-primary btn-multiselect';
        }
    }

    isAvailable(optionValue: string): boolean {
        return this.selectedValues.find(e => e === optionValue) === optionValue;
    }
}