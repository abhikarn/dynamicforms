import { FormsData, ILODetail, ISectionSummary } from '../models';

export interface ITypeform {
    referenceId?: string;
    currentIndex?: number;
    fullName?: string;
    emailId?: string;
    count?: number;
    phoneNumber?: string;
    sectionDetails?: ISectionDetail[];
    nodes?: INode[];
    autopromptInitiated?: boolean;
    autoPromptCompleted?: boolean;
    autopromptInitiatedResponse?: string;
    loggedInUser?: boolean;
    loanOfficer?: ILODetail;
    productName?: string;
    sectionSummary?: ISectionSummary;
    applicantIndex?: number;
    summarySectionDetails?: ISummarySectionDetail[];
    isUpdate?: boolean;
}
export interface ISummarySectionDetail {
    key: string;
    value: boolean;
    displayName?: string;
    sectionIndex?: string;
}
export interface INode {
    repeaterNode?: boolean;
    referParent?: boolean;
    introductionText?: boolean;
    shortText?: string;
    helpText?: string[];
    autoPrompt?: boolean;
    autoSave?: boolean;
    lastSection?: boolean;
    conditionRequired?: boolean;
    conditionalAnswerUpdated?: boolean;
    cssClass?: string;
    stepNo?: number;
    conditionId?: number;
    nextque?: number;
    columnName?: string;
    activeSection?: boolean;
    formData?: FormsData;
}

export interface ISectionDetail {
    section?: string;
    isCompleted?: boolean;
    displayName?: string;
    sectionIndex?: string;
}

export interface ITabHeaderTypeForm {
    tabIndex?: string;
    label?: string;
    fontIcon?: string;
    helpText?: string;
    questionBank?: string;
    integrationRequired?: boolean;
    integrationParameter?: IntegrationParameter;
    type?: string;
    status?: string;
    referParent?: boolean;
}
export interface IntegrationParameter {
    service: string;
    action: string;
    isResponseContainIFrameResponse: boolean;
    successMessage: string;
    failureMessage: string;
}

export interface IAddressValidation {
    result?: IResult[];
    description?: string;
    error?: IError;
    statusCode?: string;
}

export interface IError {
    source?: string;
    description?: string;
}

export interface IResult {
    addressText?: string;
    cityName?: string;
    stateCode?: string;
    postalCode?: string;
    plusFourZipCode?: string;
    deliveryPoint?: string;
    carrierRoute?: string;
}
export interface IMyDpOptions {
    dateFormat: string;
    height?: string;
    disableSince?: IMyDate;
}
export interface IMyDate {
    year?: number;
    month?: number;
    day?: number;
}
