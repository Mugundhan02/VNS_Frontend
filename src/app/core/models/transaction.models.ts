// ── Client Transaction ────────────────────────────────────────────────────
export interface ClientTransactionRequest {
  transactionDate: string;
  clientId: number;
  creditAmount: number;
  debitAmount: number;
  paymentTypeId?: number;
  byWhomId?: number;
  remarks?: string;
}

export interface ClientTransactionResponse {
  clientTransactionId: number;
  transactionDate: string;
  clientName: string;
  creditAmount: number;
  debitAmount: number;
  paymentTypeName?: string;
  byWhomName?: string;
  remarks?: string;
}

// ── Supplier Transaction ──────────────────────────────────────────────────
export interface SupplierTransactionRequest {
  transactionDate: string;
  clientId: number;
  supplierId: number;
  materialId: number;
  quantity: number;
  unit?: string;
  rate: number;
  amount: number;
  paidAmount: number;
  paymentTypeId?: number;
  toWhomId?: number;
  remarks?: string;
  isSubBill: boolean;
}

export interface SupplierTransactionResponse {
  supplierTransactionId: number;
  transactionDate: string;
  clientName: string;
  supplierName: string;
  materialName: string;
  quantity: number;
  unit?: string;
  rate: number;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentTypeName?: string;
  toWhomName?: string;
  remarks?: string;
}

// ── SubContractor Transaction ─────────────────────────────────────────────
export interface SubContractorTransactionRequest {
  transactionDate: string;
  clientId: number;
  subContractorId: number;
  jobWorkId: number;
  quantity: number;
  unit?: string;
  rate: number;
  amount: number;
  paidAmount: number;
  paymentTypeId?: number;
  toWhomId?: number;
  remarks?: string;
  isSubBill: boolean;
}

export interface SubContractorTransactionResponse {
  subContractorTransactionId: number;
  transactionDate: string;
  clientName: string;
  subContractorName: string;
  jobWorkName: string;
  quantity: number;
  unit?: string;
  rate: number;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentTypeName?: string;
  toWhomName?: string;
  remarks?: string;
}

// ── Company Expense Transaction ───────────────────────────────────────────
export interface CompanyExpenseTransactionRequest {
  transactionDate: string;
  companyId: number;
  officeExpenseId: number;
  clientId?: number;
  materialOrJobWorkName?: string;
  amount: number;
  receivedAmount: number;
  paidAmount: number;
  paymentTypeId?: number;
  toWhomId?: number;
  transactionType?: string;
  remarks?: string;
}

export interface CompanyExpenseTransactionResponse {
  companyExpenseTransactionId: number;
  transactionDate: string;
  companyName: string;
  clientName?: string;
  expenseName: string;
  materialOrJobWorkName?: string;
  amount: number;
  receivedAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentTypeName?: string;
  toWhomName?: string;
  transactionType?: string;
  remarks?: string;
}

// ── Summary ───────────────────────────────────────────────────────────────
export interface ClientSummary {
  clientId: number;
  clientName: string;
  creditsAmount: number;
  debitsAmount: number;
  balanceAmount: number;
  estimateUnits: number;
  estimateRate: number;
  estimateAmount: number;
  estimateAmountReceived: number;
  estimateAmountExpenses: number;
}

export interface SupplierSummary {
  supplierId: number;
  supplierName: string;
  payableAmount: number;
  paidAmount: number;
  balanceAmount: number;
}

export interface SubContractorSummary {
  subContractorId: number;
  subContractorName: string;
  payableAmount: number;
  paidAmount: number;
  balanceAmount: number;
}

export interface CompanySummary {
  companyName: string;
  creditsAmount: number;
  debitsAmount: number;
  balanceAmount: number;
}
