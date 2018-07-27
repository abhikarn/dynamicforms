import { FormsData } from './form-data.model';
export interface ILOSearch {
    searchKeyword?: string;
    totalItems?: number;
    currentPage?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
    searchResults?: ISearchResult[];
    filter?: IFilter[];
    summary?: ISummary[];
    header?: string;
    formsdata?: FormsData;
    isSearchFilter?: boolean;
}
export interface ISearchResult {

    fullName?: string;
    imagePath?: string;
    nmlsId?: number;
    designation?: string;
    streetAddressLine1?: string;
    streetAddressLine2?: string;
    state?: string;
    city?: string;
    county?: string;
    zip?: number;
    mobile?: number;
    phoneOffice?: number;
    fax?: number;
    userId?: string;
    branchName?: string;
    yearsOfExperience?: number;
    userName?: string;
}

export interface IFilter {
    field?: string;
    searchPattern?: string;
}
export interface ISummary {
    _id?: string;
    count?: number;
}
export interface ICurrentStatusWithName {
    name: string;
    status: boolean;
}
