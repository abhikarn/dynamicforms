export interface IConfirmationModal {
    body: string;
    title?: string;
    firstButtonText: string;
    secondButtonText: string;
    hideCrossButton?: boolean;
    hideSecondButton?: boolean;
    modalSize?: string;
    styles?: string;
    buttonControls?: IButtonControls[];
    commentSectionRequired?: boolean;
    comment?: string;
}

export interface IButtonControls {
    buttonId: string;
    buttonText: string;
    class?: string;
}