export interface text {
  id: string;
  uid: string;
  content: string;
  updatedAt?: number;
  createdAt: number | null;
  error?: Error;
  isDeleted?: boolean;
  isLocal?: boolean;
}
