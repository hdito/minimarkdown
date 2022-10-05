import { Timestamp } from "firebase/firestore";

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

export interface textFromServer {
  uid: string;
  content: string;
  id: string;
  updatedAt?: Timestamp;
  createdAt: Timestamp;
}
