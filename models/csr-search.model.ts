export interface ICSRSearch {
    searchKey: string;
    curpage?: string;
    pageSize?: string;
    sortBy?: string;
    orderBy?: string;
}

export interface ICSRSearchResult {
    totalPages?: number;
    page?: number;
    pageSize?: number;
    error?: string;
    data: IUserData[];
}

export interface IUserData {
    name: string;
    userId: string;
    mobileNo: number;
    userStatus: string;
    createdDate: string;
}

export interface IUserRequest {
    pageSize: number;
    page: 1;
    totalPages: number;
    headers?: any;
    data: ICSRApplicationData[];
}

export interface ICSRApplicationData {
    userId: string;
    referenceId: string;
    createdDate: string;
    requestType: string;
    purpose: string;
    propertyAddress: string;
    zip: string;
    data: any;
    loanOfficer: string;
    updatedDate: string;
}

export interface ICSRNotesHistoryRequest {
    userId: string;
    changeType: string;
    referenceId?: string;
    curpage?: string;
    pageSize?: string;
}

export interface IViewApplicationResult {
    pageSize?: number;
    page?: number;
    totalPages?: number;
    headers?: string[];
    error?: string;
    data: IViewApplicationData[];
}

export interface IViewApplicationData {
    key: string;
    value: string;
}