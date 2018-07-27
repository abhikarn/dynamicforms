export interface IProductHeader {
    headerMessage?: string;
    referenceId?: string;
    productsAvailable?: boolean;
    purpose?: string;
    displayQuoteSummary?: boolean;
    productSummaries?: Array<IProductSummary>;
    detailStructure?: IProductDetail;
}

export interface IProductSummary {
    productName?: string;
    productIndex?: string;
    productType?: string;
    helpText?: string;
    attributes?: Array<Field>;
    productDetails?: IProductDetail;
    actionLabel?: string;
}

export interface IProductDetail {
    header?: string;
    productName?: string;
    productIndex?: string;
    helpText?: string;
    tabs?: Array<ITabHeader>;
    actionLabel?: string;
}
export interface IFilterOptions {
    label?: string;
    value?: string;
}

export interface ITabHeader {
    id?: string;
    value?: string;
    label?: string;
    preSymbol?: string;
    postSymbol?: string;
    helpText?: string;
    subHeading?: string;
    additionalInfo?: Array<string>;
    innerAttributes?: Array<Field>;
    total?: Field;
}

export interface Field {
    id?: string;
    value?: string;
    label?: string;
    preSymbol?: string;
    postSymbol?: string;
}