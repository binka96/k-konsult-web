import { PropertyDto } from "./property.interface";

export interface InquiriesDto{
    inquiryId: string;
    name : string;
    lastName : string;
    email : string;
    phone: string;
    comment : string;
    date: string;
    time: string;
    jdprConferm: boolean;
    property: PropertyDto
  }