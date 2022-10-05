import { text } from "../types/textTypes";
export const sortTexts = (text1: text, text2: text) => {
  if (text1.updatedAt) {
    if (text2.updatedAt) return text1.updatedAt - text2.updatedAt;
    if (text2.createdAt) return text1.updatedAt - text2.createdAt;
    return -1;
  }
  if (text2.updatedAt) {
    if (text1.updatedAt) return text1.updatedAt - text2.updatedAt;
    if (text1.createdAt) return text1.createdAt - text2.updatedAt;
    return 1;
  }
  if (text1.createdAt) {
    if (text2.createdAt) return text1.createdAt - text2.createdAt;
    return -1;
  }
  if (text2.createdAt) return 1;
  return 0;
};
