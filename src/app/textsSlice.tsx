import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { text } from "../types/text";

const initialState: { texts: text[]; isLoading: boolean; error: Error | null } =
  { texts: [], isLoading: false, error: null };

export const textsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    deleteTextFail: (state, action) => {
      state.error = action.payload;
    },
    fetchSuccess: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchTexts: (state) => {
      state.isLoading = true;
    },
    addTextError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTextSuccess: (
      state,
      action: PayloadAction<{
        text: text;
      }>
    ) => {
      state.texts.push({ ...action.payload.text });
    },
    deleteText: (state, action) => {
      const textToDelete = state.texts.find(
        (text) => text.id === action.payload.id
      );
      if (!textToDelete) return;
      textToDelete.isDeleted = true;
    },
    deleteTextSuccess: (state, action) => {
      const indexToDelete = state.texts.findIndex(
        (text) => text.id === action.payload.id
      );
      state.texts.splice(indexToDelete, 1);
    },
    modifyText: (state, action) => {
      const indexToModify = state.texts.findIndex(
        (text) => text.id === action.payload.text.id
      );
      state.texts[indexToModify] = { ...action.payload.text };
    },
    addText: (state, action: PayloadAction<{ uid: string }>) => {},
  },
});

export const {
  deleteText,
  deleteTextSuccess,
  deleteTextFail,
  modifyText,
  addText,
  addTextSuccess,
  addTextError,
  fetchError,
  fetchSuccess,
  fetchTexts,
} = textsSlice.actions;

export default textsSlice.reducer;
