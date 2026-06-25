export interface PaymentTypeRequest { paymentTypeName: string; }
export interface PaymentTypeResponse { paymentTypeId: number; paymentTypeName: string; createdAt: string; }

export interface WhomRequest { whomName: string; }
export interface WhomResponse { whomId: number; whomName: string; createdAt: string; }

export interface OfficeExpenseRequest { expenseName: string; }
export interface OfficeExpenseResponse { officeExpenseId: number; expenseName: string; createdAt: string; }

export interface CompanyBankRequest {
  companyId: number;
  bankName: string;
  bankBranch?: string;
  branchCode?: string;
  ifscCode?: string;
  accountName?: string;
  accountNumber?: string;
  accountType?: string;
}

export interface CompanyBankResponse {
  companyBankId: number;
  companyId: number;
  bankName: string;
  bankBranch?: string;
  ifscCode?: string;
  accountName?: string;
  accountType?: string;
  createdAt: string;
}

export interface InstallmentTermRequest {
  termName: string;
  numberOfInstallments?: number;
  description?: string;
}

export interface InstallmentTermResponse {
  installmentTermId: number;
  termName: string;
  numberOfInstallments?: number;
  description?: string;
  createdAt: string;
}
