export interface CompanyRequest {
  companyName: string;
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
  panCardNumber?: string;
  tinNumber?: string;
  cstNumber?: string;
}

export interface CompanyResponse {
  companyId: number;
  companyName: string;
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
  panCardNumber?: string;
  tinNumber?: string;
  cstNumber?: string;
  createdAt: string;
}

export interface CompanyUserRequest {
  companyId: number;
  userName: string;
  password: string;
  userType: string;
}

export interface CompanyUserUpdateRequest {
  userName: string;
  userType: string;
  isActive: boolean;
}

export interface CompanyUserResponse {
  companyUserId: number;
  companyId: number;
  companyName: string;
  userName: string;
  userType: string;
  isActive: boolean;
}
