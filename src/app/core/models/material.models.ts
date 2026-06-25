export interface MaterialRequest {
  materialName: string;
  unit?: string;
  rate: number;
}

export interface MaterialResponse {
  materialId: number;
  materialName: string;
  unit?: string;
  rate: number;
  createdAt: string;
}

export interface JobWorkRequest {
  jobWorkName: string;
  unit?: string;
  rate: number;
}

export interface JobWorkResponse {
  jobWorkId: number;
  jobWorkName: string;
  unit?: string;
  rate: number;
  createdAt: string;
}
