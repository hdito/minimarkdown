import { Timestamp } from "firebase/firestore";

export interface textFromServer {
  uid: string;
  content: string;
  id: string;
  updatedAt?: Timestamp;
  createdAt: Timestamp;
}
