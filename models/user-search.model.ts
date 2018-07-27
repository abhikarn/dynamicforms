export interface IUSERSearch {
    searchKey: string;
    searchValue?: string;
    status?: string;
    roles?: string[];
}

export interface IUSERSearchResult {
    headers?: any;
    error?: string;
    userResponseData: IUSEResponseData[];
}

export interface IUSEResponseData {
    name?: string;
    roles?: string[];
    userId?: number;
    status?: string;
}

