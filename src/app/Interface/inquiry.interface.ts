import { Time } from "@angular/common";

export interface InquiryDto{
  name : string;
  lastName : string;
  email : string;
  phone: string;
  comment : string;
  date: string;
  time: string;
  jdprConferm: boolean;
}