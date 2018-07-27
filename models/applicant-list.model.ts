export interface IApplicant {
    applicantIndex: number;
    applicantName: string;
    sectionDetails?: ISectionDetail1[];
    seleted?: boolean;
}

export interface IStatus {
    id: number;
    name: string;
    status: string;
}

export interface ISectionDetail1 {
    section?: string;
    isCompleted?: boolean;
}
