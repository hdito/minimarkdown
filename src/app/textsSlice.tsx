import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActionErrorPayload,
  ActionIdPayload,
  ActionTextPayload,
} from '../types/textActionTypes';
import { text } from '../types/textTypes';

type initialState = {
  texts: text[];
  isLoading: boolean;
  error: unknown | null;
};

const initialState: initialState = { texts: [], isLoading: false, error: null };

export const textsSlice = createSlice({
  name: 'texts',
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

      state.texts[indexToModify] = {
        ...state.texts[indexToModify],
        ...action.payload,
      };
    },
    saveTextSuccess: (state, action: ActionIdPayload) => {
      const text = state.texts.find(
        (text) => text.id === action.payload
      ) as text;
      text.save = true;
    },
    saveTextError: (
      state,
      action: PayloadAction<{ id: string; error: unknown }>
    ) => {
      const text = state.texts.find(
        (text) => text.id === action.payload.id
      ) as text;
      text.save = action.payload.error;
    },
    clearSaveData: (state, action: PayloadAction<string>) => {
      const text = state.texts.find(
        (text) => text.id === action.payload
      ) as text;
      text.save = null;
    },
  },
});

export const {
  saveTextSuccess,
  saveTextError,
  clearSaveData,
  deleteText,
  deleteTextSuccess,
  deleteTextFail,
  modifyText,
  addTextSuccess,
  addTextError,
  fetchError,
  fetchSuccess,
  fetchTexts,
} = textsSlice.actions;

export const saveText = createAction<{ id: string; content: string }>(
  'texts/saveText'
);
export const addText = createAction<string>('texts/addText');

export default textsSlice.reducer;
