export interface SubContractorRequest {
  subContractorName: string;
  doorNoAndStreetName?: string;
  areaName?: string;
  place?: string;
  pinCode?: string;
  cityOrTalukName?: string;
  districtAndStateName?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  faxNumber?: string;
  emailId?: string;
  websiteName?: string;
  accountNumber?: string;
  accountName?: string;
  accountType?: string;
  bankName?: string;
  bankBranch?: string;
  branchCode?: string;
  ifscCode?: string;
  panCardNumber?: string;
  tinNumber?: string;
  aadhaarNumber?: string;
  workName?: string;
  esr?: number;
  rate?: number;
}

export interface SubContractorResponse {
  subContractorId: number;
  subContractorName: string;
  doorNoAndStreetName?: string;
  areaName?: string;
  place?: string;
  pinCode?: string;
  cityOrTalukName?: string;
  districtAndStateName?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  faxNumber?: string;
  emailId?: string;
  websiteName?: string;
  bankName?: string;
  bankBranch?: string;
  accountName?: string;
  accountType?: string;
  ifscCode?: string;
  workName?: string;
  esr?: number;
  rate?: number;
  createdAt: string;
}
