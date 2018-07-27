
import {
    Validators,
    ValidatorFn
} from '@angular/forms';

import { ControlProperty } from '../models';
export class CustomValidators {
    //This is custom validations for macthing two fields are equal .
    static match(key: string) {
        return (control: any) => {

            if (control.value && control.root.controls) {
                return control.root.controls[key].value !== control.value ? { 'match': { 'currentValue': control.value, 'requiredValue': control.root.controls[key].value, 'mustMatchField': key } } : null;
            }
            return null;
        };
    }
    static pattern1(key: string) {
        let regE = new RegExp(key);
        return (control: any) => {
            if (control.value !== '' && (!regE.test(control.value))) {
                return { 'pattern1': { 'currentValue': control.value, 'requiredValue': '', 'mustMatchField': key } };
            }
            return null;
        };
    }
    static pattern2(key: string) {
        let regE = new RegExp(key);
        return (control: any) => {
            if (control.value !== '' && (!regE.test(control.value))) {
                return { 'pattern2': { 'currentValue': control.value, 'requiredValue': '', 'mustMatchField': key } };
            }
            return null;
        };
    }

    static pattern3(key: string) {
        let regE = new RegExp(key);
        return (control: any) => {
            if (control.value !== '' && (!regE.test(control.value))) {
                return { 'pattern3': { 'currentValue': control.value, 'requiredValue': '', 'mustMatchField': key } };
            }
            return null;
        };
    }

    /* This method sets all required validation comming from service to FormGroup  */
    static setValidators(controls: any, control: ControlProperty) {
        let validatorFns: ValidatorFn[] = [];
        if (control.showValidation) {
            if (!!control.validations) {
                for (let i = 0; i < control.validations.length; i++) {
                    if (control.validations[i].type === 'required') {
                        validatorFns.push(Validators.required);
                    } else if (control.validations[i].type === 'minlength') {
                        validatorFns.push(Validators.minLength(+control.validations[i].value));
                    } else if (control.validations[i].type === 'maxlength') {
                        validatorFns.push(Validators.maxLength(+control.validations[i].value));
                    } else if (control.validations[i].type === 'pattern') {
                        validatorFns.push(Validators.pattern(control.validations[i].value));
                    } else if (control.validations[i].type === 'match') {
                        validatorFns.push(CustomValidators.match(control.validations[i].value));
                    }
                    else if (control.validations[i].type === 'pattern1') {
                        validatorFns.push(CustomValidators.pattern1(control.validations[i].value));
                    }
                    else if (control.validations[i].type === 'pattern2') {
                        validatorFns.push(CustomValidators.pattern2(control.validations[i].value));
                    }
                    else if (control.validations[i].type === 'pattern3') {
                        validatorFns.push(CustomValidators.pattern3(control.validations[i].value));
                    }
                }
            }
        }
        return validatorFns;
    }
}