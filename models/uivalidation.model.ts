import { FormsData } from './form-data.model';
export interface UIValidation {
    expressionType?: string;
    expression?: string;
    checkDataType?: Array<{ key: string, type: string }>;
    subExpressions?: string[];
    trueValue?: ReturnedValue;
    falseValue?: ReturnedValue;
}

export interface ReturnedValue {
    message?: string;
    popup?: boolean;
    popupType?: string;
    subExpressionsValue?: string[];
    expression?: string;
    evaluatedValue?: string;
    type?: string;
    isError?: boolean;
    targetId?: string;
    showErrors?: boolean;
    conditionName?: string;
}