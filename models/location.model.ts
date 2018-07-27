export interface ILocation {
    hideZip: boolean;
    zipPlaceholder?: string;
    isZipFirst?: boolean;
    hideState?: boolean;
    hideCity?: boolean;
    hideCounty?: boolean;
    styleClass: string;
    validateZipAndPopulate?: boolean;
}

export class ILocationDetails {
    stateName?: string;
    stateCode?: string;
    cityName?: string;
    countyName?: string;
    postalCode?: string;
    serviceFlag?: boolean;
    message?: string;
}