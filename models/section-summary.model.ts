export interface ISectionSummary {
      applicantList?: Array<IApplicantDetails>;
      sectionDetails?: Array<ISectionDetails>;
      selectedTabIndex?: number;
      addFirstRecordLabel?: string;
      noRecordLabel?: string;
      noRecordDesc?: string;
      addRecordLabel?: string;
      importDataLabel?: string;
      deleteMessage?: string;
      isIntegrationCompleted?: boolean;
      authorizationPageName?: string;
      sectionCompleted?: boolean;
      currentIndex?: number;
      canDelete?: boolean;
      currentApplicantIndex?: number;
      filters?: ISectionFilters[];
      successStaticMessage?: string;
      noRecordText?: string;
      totalText?: string;
      totalValue?: number;
      totalText2?: string;
      totalValue2?: number;
      editClicked?: boolean;
      creditScore?: number;
      maxSectionsAllowed?: number;
}

export interface IApplicantDetails {
      applicantIndex?: number;
      applicantName?: string;
      completionStatus?: boolean;
}

export interface ISectionDetails {
      sectionHeader?: string;
      jointLabelCheck?: string;
      jointLabelName?: string;
      filterValue?: string;
      index: number;
      sectionAttributes: Array<ISectionAttributes>;
}

export interface ISectionAttributes {
      header?: string;
      value?: string;
      cssClass?: string;
      exclude?: boolean;
      prefix?: string;
}
export interface ISectionFilters {
      displayText?: string;
      filterField?: string;
      filterFieldValue?: string;
      totalFilter?: string;
      totalFilter1?: string;
}