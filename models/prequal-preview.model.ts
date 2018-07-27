export interface IPrequalPreview {
    name?: string;
    createdDate?: string;
    productName?: string;
    sections?: IPreviewSection[];
}

export interface IPreviewSection {
    sectionName?: string;
    tabIndex?: number;
    tabText?: string;
    borrowers?: IBorrower[];
}

export interface IBorrower {
    sectionUser?: string;
    data?: IPreviewData[];
}
export interface IPreviewData {
    sectionShortText: string;
    fields: IPreviewInnerField[];
}

export interface IPreviewInnerField {
    key: string;
    value: string;
}