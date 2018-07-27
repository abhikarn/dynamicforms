import { ControlProperty } from './control.model';

export interface FormsData {
    id: string;
    buttonText?: string;
    resetText?: string;
    resetRequired?: boolean;
    controls?: Array<ControlProperty>;
    title?: string;
    isFormValid?: boolean;
    hideButton?: boolean;
    changePasswordText?: string;
    changePasswordRequired?: boolean;
    formClass?: string;
    rowClass?: string;
}

export interface ButtonViewApplication {
    type: string;
    id: string;
    value: string;
    visibility: string;
    class: string;
}

export interface ButtonNavigations {
    type: string;
    id: string;
    value: string;
    order: number;
    class: string;
}