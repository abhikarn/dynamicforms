export interface IFields {
    id: string;
    label: string;
    value: string;
    symbol: string;
}

export interface IStatus {
    name: string;
    order: number;
    customName: string;
    isCompleted: boolean;
    date: string;
}

export interface ILOSData {
    fields: IFields[];
    status: IStatus[];
    applicationNo: string;
    closingDate: Date;
    noOfDays: number;
}
