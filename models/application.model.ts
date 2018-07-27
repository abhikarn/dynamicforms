import { FormsData, ILODetail, ISectionSummary, INode, ISummarySectionDetail, ControlProperty } from '../models';

export interface IApplication {
    referenceId: string;
    journey: string;
    applicantIndex: number;
    currentIndex: number;
    fullName?: string;
    emailId?: string;
    phoneNumber?: string;
    applicantList?: IApplicant[];
    autopromptInitiated?: boolean;
    autopromptInitiatedResponse?: string;
    loggedInUser?: boolean;
    loanOfficer?: ILODetail;
    productName?: string;
    update?: boolean;
    alreadyInitiliazed?: boolean;
    readonly configuration?: IApplicationConfig;
}

export interface IApplicant {
    applicantIndex: number;
    applicantName: string;
    sectionDetails?: ISectionDetail1[];
    seleted?: boolean;
}

export interface ISectionDetail1 {
    section?: string;
    isCompleted?: boolean;
}


export interface ISectionContent {
    nodes?: INode[];
    sectionSummary?: ISectionSummary;
    summarySectionDetails?: ISummarySectionDetail[];
    authData?: IAuthSectionModel;
    iframeData?: IIFrameDetail;
}

export interface SaveEventModel {
    isConditionNode: boolean;
    isLastSection: boolean;
    nodes: INode[];
    isFormCompleted?: boolean;
    isAutoPromptReqd?: boolean;
}

export interface IApplicationConfig {
    readonly allowToSelectLO?: boolean;
    readonly showLODiv?: string;
    readonly searchLOCaption?: string;
    readonly showProductAndPricingDiv?: boolean;
    readonly fetchUserInformation?: boolean;
    readonly captionForNoProducts?: string;
    readonly createUserIfEmailIdIsAvailable?: string;
    readonly indexToEnableTab?: number;
    readonly showIntermediatePage?: boolean;
    readonly nextJourney?: { readonly switchPoint: string, nextJourneyName: string };
}

export interface IStatus {
    id: number;
    name: string;
    status: string;
}

export interface IValidationResult {
    id: string;
    isError: boolean;
    message: string;
    canSkip: boolean;
}


export interface IAuthSectionModel {
    authHeader: string;
    authContent: string;
    authTerms: string;
    buttons: {
        importButton: string,
        manualButton: string
    };
    controls: ControlProperty[];
}

export interface IIFrameDetail {
    widget: string;
    serviceOrderVodId: string;
    finAccessToken: string;
}

export interface ISummaryDetail {
    label: string;
    status: string;
    index: string;
}

export interface IEConsentData {
    label: string;
    description: string;
    consentSuccessMessage: string;
    consentDenyMessage: string;
    giveConsentButtonLabel: string;
    denyConsentButtonLabel: string;
    consentDisplayMessage: string;
    eConsentDetails: IEConsentDetail;
}

export interface IEConsentDetail {
    eConsentAcceptance: boolean;
}