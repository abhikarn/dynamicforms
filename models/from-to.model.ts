import { IMyOptions } from 'mydatepicker';

export interface IFromToOptions {
    fromLabel: string;
    toLabel: string;
    datepickerOptions: IMyOptions;
    isFuturePickable: boolean;
    isPastPickable: boolean;
    showPresentInFromField?: boolean;
    showPresentInToField?: boolean;
}

export interface IFromTo {
    from: string;
    to: string;
}