export interface SupplierRequest {
  supplierName: string;
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
}

export interface SupplierResponse {
  supplierId: number;
  supplierName: string;
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
  panCardNumber?: string;
  tinNumber?: string;
  cstNumber?: string;
  createdAt: string;
}
