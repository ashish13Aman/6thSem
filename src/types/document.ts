export type DocumentStatus = 'pending' | 'verified' | 'rejected';
export type DocumentType = 'pdf' | 'png' | 'jpeg' | 'jpg';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  status: DocumentStatus;
  uploadedAt: string;
  url: string;
  category: string;
  rejectionReason?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}