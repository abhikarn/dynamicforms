/* tslint:disable */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ControlProperty, FormsData, ILocationDetails, Option } from '../models';
import { CustomValidators } from './dynamic-form.customvalidations';
import { DynamicControlService } from './dynamic-control/dynamic-control.service';
@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

    @Input() fieldsData: FormsData;
    @Input() formGroup: FormGroup;
    controlInputs: Array<ControlProperty>;
    @Input() buttonText: string;
    @Input() resetText?: string;
    @Input() resetRequired?: boolean;
    @Input() toggleButton?: boolean;
    @Input() carouselButtonStyle: boolean;
    @Input() toggleValue?: boolean;
    @Input() groupName: string;

    // THIS CODE IS HACK NEED TO MOVE TO GENERIC PLACE
    linkReqd: boolean = false;
    buttonHide: boolean = false;
    controls: Array<ControlProperty[]> = [];
    rowCnt: number = 1;

    @Output() bindText: EventEmitter<any> = new EventEmitter();
    @Output() submitForm: EventEmitter<any> = new EventEmitter();
    @Output() formChange: EventEmitter<any> = new EventEmitter();
    @Output() cancelClick: EventEmitter<any> = new EventEmitter();
    @Output() keypress: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() toggleChange: EventEmitter<any> = new EventEmitter();
    @Output() keyupdelete: EventEmitter<any> = new EventEmitter();
    @Output() keyuppress: EventEmitter<any> = new EventEmitter();
    @Output() input: EventEmitter<any> = new EventEmitter();
    @Output() onSearchClickForm: EventEmitter<string> = new EventEmitter<string>();
    @Output() onChangePassword: EventEmitter<any> = new EventEmitter();
    @Output() formatSearchInput: EventEmitter<any> = new EventEmitter();
    @Output() radioBtnClick: EventEmitter<any> = new EventEmitter();
    @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
    @Output() sendSearchParams: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() onSubmitRepeater: EventEmitter<any> = new EventEmitter();
    @Output() onBlurRepeater: EventEmitter<any> = new EventEmitter();
    @Output() handleSwitchForm: EventEmitter<any> = new EventEmitter();
    @Output() onDropdownSelectTypeform: EventEmitter<any> = new EventEmitter();

    /**USED TO PREVENT ISSUES BECUASE OF SUBMIT AND BLUR EVENT TRIGGERED TOGETHER*/
    triggerBlurEvent: boolean = true;

    constructor(public dynamicControlService: DynamicControlService, public fb: FormBuilder
    ) {
        this.formChange.emit(this.fieldsData);
        this.linkReqd = localStorage.getItem('showForgotPswd') === 'true';
        localStorage.removeItem('showForgotPswd');
    }
    ngOnInit() {

        this.buttonText = this.fieldsData.buttonText;
        this.resetText = this.fieldsData.resetText;
        this.resetRequired = this.fieldsData.resetRequired;

        if (this.buttonText != null && this.buttonText !== '') {
            this.buttonHide = true;
        }

        this.controlInputs = this.fieldsData.controls;
        this.formGroup = this.createFormGroup(this.fieldsData.controls);// this.generateForm(this.controlInputs || []);
        // this.formGroup = this.generateForm(this.controlInputs || []);
        for (let entry of this.controlInputs) {
            this.generateRow(entry);
        }
        this.bindText.emit(this.buttonText);
    }

    public createFormControl(control: ControlProperty, opt?: Option) {
        control.previousValue = control.value;
        return this.fb.control({ value: control.value || '', disabled: control.isEnabled }, CustomValidators.setValidators(null, control));
    }

    public createFormArrayGroup(control: FormsData[]): FormArray {
        if (!!control) {
            const groupArray = this.fb.array([]);
            control.forEach((form: FormsData) => {
                groupArray.push(this.createFormGroup(form.controls));
            });
            return groupArray;
        }
    }

    public createFormGroup(controls: ControlProperty[]): FormGroup {
        if (!!controls) {
            const group = this.fb.group({});
            controls.forEach((control) => {
                if (control.controlType === 'repeater') {
                    group.addControl(control.id, this.createFormArrayGroup(control.repeater));
                } else {
                    if (control.controlType === 'checkbox') {
                        // control.options.forEach((opt) => {
                        group.addControl(control.id, this.createFormControl(control));
                        // });
                    } else {
                        group.addControl(control.id, this.createFormControl(control));
                    }
                }
            });
            return group;
        }
    }

    generateRow(question: ControlProperty) {
        if (!question.row) {
            question.row = question.order;
            if (!question.row) {
                question.row = this.rowCnt;
                this.rowCnt++;
            }
        }

        if (!this.controls[question.row]) {
            this.controls[question.row] = [];
            this.controls[question.row].push(question);
        } else {
            this.controls[question.row].push(question);
        }

    }
    submit(event: any) {
        this.triggerBlurEvent = true;
        this.fieldsData.controls.map(ctrl => {
            if (ctrl.controlType.toLowerCase() === 'currency') {
                this.formGroup.controls[ctrl.id].setValue(+ctrl.value);
            }
        });
        // console.log(this.formGroup.value);
        if (this.formGroup.valid) {
            // this.fieldsData.controls.map(control => {
            //     control.value = this.formGroup.value[control.id]
            // });
            this.submitForm.emit({ event: event, param: JSON.stringify(this.formGroup.value), formGrp: this.formGroup });
        }
    }

    submitR(event) {
        this.onSubmitRepeater.emit({ event: event, param: JSON.stringify(this.formGroup.value), formGrp: this.formGroup });
    }
    onkeypress(event: any) {
        //  this.fieldsData.isFormValid = this.formGroup.valid;
        this.keypress.emit({ event: event, param: event.param });
    }

    onkeyupdelete(event: any, type?: string) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        //if (type === 'currency' && !event.param.value) {
        //this.formGroup.reset();
        //}
        this.keyupdelete.emit({ event: event, param: event.param });
    }

    onkeyup(event: any) {
        //     this.fieldsData.isFormValid = this.formGroup.valid;
        this.keyuppress.emit({ event: event, param: event.param });
    }

    onInput(event: any) {
        //    this.fieldsData.isFormValid = this.formGroup.valid;
        if (event.param) {
            this.input.emit(event);
        }
    }

    onblur(event: any) {
        if (!this.triggerBlurEvent) {
            this.triggerBlurEvent = true;
            return;
        }
        //  this.fieldsData.isFormValid = this.formGroup.valid;        
        this.blur.emit({ event: event, param: event.param, control: event.control, formGroup: this.formGroup });
    }

    onKeyDown(event: any) {
        if (event.keyCode === 13) {
            this.triggerBlurEvent = false;
        }
    }

    onMouseDown(event: any) {
        this.triggerBlurEvent = false;
    }

    onBlurR(event) {
        //     this.fieldsData.isFormValid = this.formGroup.valid;
        this.onBlurRepeater.emit({ event: event, param: event.param, control: event.control });
    }
    onDropdownSelectForm(event: any) {
        this.onDropdownSelectTypeform.emit({ event: event, param: event.param, control: event.control, formGroup: this.formGroup });
    }
    onToggleChange(event: any) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.toggleChange.emit({ event: event, param: event.param });
    }
    onSearchClick(value) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.onSearchClickForm.emit(value);
    }
    filtersearchinput(value) {
        this.formatSearchInput.emit(value);
    }

    onResetClick(event: any) {
        this.cancelClick.emit(event);
    }
    onTestClick(event) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.cancelClick.emit(event);
    }
    onChangePassordClick(event: any) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.onChangePassword.emit(event);
    }
    onRadioBtnClick(event: any) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.radioBtnClick.emit({ event: event, param: event.param, triggeredFromKeyBoard: event.triggeredFromKeyBoard, control: event.control, formGrp: this.formGroup });
    }
    onLocationSelect(event: any) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.selectedLocation.emit(event);
    }

    sendSearchParam(event: any) {
        //   this.fieldsData.isFormValid = this.formGroup.valid;
        this.sendSearchParams.emit(event);
    }

    onChange(event: any) {
        //    this.fieldsData.isFormValid = this.formGroup.valid;
        this.change.emit(event);
    }
    handleSwitchControl(event: any) {
        this.handleSwitchForm.emit(event);
    }
}