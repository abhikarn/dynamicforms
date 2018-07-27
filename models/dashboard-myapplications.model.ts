export interface Column {
    columnId: string;
    columnName: string;
    columnType: string;
    columnValue: string;
}

export interface NavigationLinks {
    navigationHeader: string;
    buttons: Array<Button>;

}

export interface Button {
    buttonLabel: string;
    internalURL: string;
}
