export interface IAdminLinks {
    header: ILinks;
    footer: ILinks;
}

export interface ILinks {
    type: string;
    copyright?: string;
    status: string;
    data: INavigation[];
}

export interface INavigation {
    isInternal: boolean;
    linkName: string;
    linkUrl?: string;
}

export interface IInternalLinks {
    applicationName: string;
    applicationLink: string;
    isDefault?: boolean;
}