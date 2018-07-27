export interface ILODetail {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    userName?: string;
    areaOfExpertise?: string;
    testimonials?: ITestmonial[];
    comments?: IComments[];
    nmlsId?: number;
    fullName?: string;
    imagePath?: string;
    designation?: string;
    streetAddressLine1?: string;
    streetAddressLine2?: string;
    state?: string;
    city?: string;
    county?: string;
    zipcode?: string;
    mobileNo?: string;
    officePhoneNo?: string;
    fax?: string;
    branchName?: string;
    yearsOfExperience?: number;
    awards?: string;
    aboutLO?: string;
    socialMediaLinks?: ISocialMediaLink[];
    userId?: string;
    profileimage?: string;
    status?: string;
    roles?: IRole[];
    updatedDate?: string;
    updatedBy?: string;
}
export interface ISocialMediaLink {
    sitename: string;
    sitelink: string;
}
export interface IComments {
    commentDetails?: string;
    commentedUser?: string;
    commentedDateTime?: string;
}
export interface ISocialMediaLink {
    sitename: string;
    sitelink: string;
}
export interface ITestmonial {
    testimonial?: string;
    name?: string;
    location?: string;
    textLength?: number;
    textIndex?: number;
}
export interface IRole {
    name: string;
    permissions: string[];
}