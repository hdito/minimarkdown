import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { text } from "../types/textTypes";
import { rootState } from "./main";
import {
  ActionErrorPayload,
  ActionTextPayload,
  ActionIdPayload,
  ActionUidPayload,
  ActionIdContentPayload,
} from "../types/textActionTypes";

type initialState = {
  texts: text[];
  isLoading: boolean;
  error: unknown | null;
};

const initialState: initialState = { texts: [], isLoading: false, error: null };

export const textsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    deleteTextFail: (state, action: ActionErrorPayload) => {
      state.error = action.payload;
    },
    fetchSuccess: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    fetchError: (state, action: ActionErrorPayload) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchTexts: (state) => {
      state.isLoading = true;
    },
    addTextError: (state, action: ActionErrorPayload) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTextSuccess: (state, action: ActionTextPayload) => {
      state.texts.push({ ...action.payload });
    },
    deleteText: (state, action: ActionIdPayload) => {
      const textToDelete = state.texts.find(
        (text) => text.id === action.payload
      );
      if (!textToDelete) return;
      textToDelete.isDeleted = true;
    },
    deleteTextSuccess: (state, action: ActionIdPayload) => {
      const indexToDelete = state.texts.findIndex(
        (text) => text.id === action.payload
      );
      state.texts.splice(indexToDelete, 1);
    },
    modifyText: (state, action: ActionTextPayload) => {
      const indexToModify = state.texts.findIndex(
        (text) => text.id === action.payload.id
      );
      state.texts[indexToModify] = { ...action.payload };
    },
    addText: (state, action: ActionUidPayload) => {},
    saveText: (state, action: ActionIdContentPayload) => {},
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
  saveText,
} = textsSlice.actions;

export default textsSlice.reducer;
