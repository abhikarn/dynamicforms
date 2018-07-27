import { FormsData, ILocation, ILocationDetails, IFromToOptions } from '../models';
import { UIValidation } from './uivalidation.model';
export interface ControlProperty {
    controlType: string;
    id: string;
    fieldId: string;
    type: string;
    label?: string;
    class?: string;
    placeholder?: string;
    options?: Array<Option>;
    validations?: Array<Validation>;
    value?: string | ILocationDetails;
    required?: boolean;
    order?: number;
    showValidation?: boolean;
    restrictionpattern?: string;
    section?: string;
    row?: number;
    allowMultiSelect?: boolean;
    maxlength?: number;
    readOnly?: boolean;
    showEditOption?: boolean;
    isEnabled?: boolean;
    enableFilter?: boolean;
    currencyFormat?: ICurrencyFormat;
    fieldLevelClass?: string;
    repeater?: FormsData[];
    hideElement?: boolean;
    location?: ILocation;
    uiValidations?: Array<UIValidation>;
    previousValue?: string | ILocationDetails;
    maskFull?: boolean;
    unMaskedvalue?: string | string[];
    copyCondion?: string;
    fromToDatePickerOptions?: IFromToOptions;
}
export interface ICurrencyFormat {
    prefix: string;
    precision: number;
}

export interface Option {
    value: string;
    name: string;
    selected?: boolean;
    resetOption?: boolean;
}
export interface Validation {
    type: 'required' | 'minlength' | 'maxlength' | 'pattern' | 'pattern1' | 'pattern2' | 'pattern3' | 'match' | 'email' | 'zipcode_US' | 'phone_US' | 'validIfEnable' | 'invalidDate';
    value?: string;
    message?: string;
}
export interface Style {
    className: string;
}
