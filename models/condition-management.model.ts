import { IAccordion } from './accordion.model';

export interface IConditionManagement {
    header?: string;
    loanNumber?: string;
    supportedFormats?: string[];
    maxSize?: string;
    submitButtonText?: string;
    clearButtonText?: string;
    uploadButtonText?: string;
    applicantList?: IApplicantList[];
    categoryList?: ICategoryList[];
}

export interface IApplicantList {
    name?: string;
    applicantIndex?: string;
}

export interface ICategoryList {
    category?: string;
    items?: IAccordion[];
}

export interface IConditionMgmntRequest {
    referenceId?: string;
    applicantIndex?: number;
}