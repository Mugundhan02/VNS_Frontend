export interface ClientRequest {
  clientName: string;
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
  cstNumber?: string;
  aadhaarNumber?: string;
  estimateUnit?: number;
  estimateRate?: number;
  estimateAmount?: number;
}

export interface ClientResponse {
  clientId: number;
  clientName: string;
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
  accountName?: string;
  accountType?: string;
  bankName?: string;
  bankBranch?: string;
  ifscCode?: string;
  estimateUnit?: number;
  estimateRate?: number;
  estimateAmount?: number;
  createdAt: string;
}
