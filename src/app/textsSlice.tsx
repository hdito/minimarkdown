import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActionErrorPayload,
  ActionIdPayload,
  ActionTextPayload,
} from '../types/textActionTypes';
import { text } from '../types/textTypes';
import { rootState } from './main';

type initialState = {
  texts: { [key: string]: text };
  isLoading: boolean;
  error: unknown | null;
};

const initialState: initialState = { texts: {}, isLoading: false, error: null };

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
      state.texts[action.payload.id] = { ...action.payload };
    },
    deleteText: (state, action: ActionIdPayload) => {
      state.texts[action.payload].isDeleted = true;
    },
    deleteTextSuccess: (state, action: ActionIdPayload) => {
      delete state.texts[action.payload];
    },
    modifyText: (state, action: ActionTextPayload) => {
      state.texts[action.payload.id] = {
        ...state.texts[action.payload.id],
        ...action.payload,
      };
    },
    saveTextSuccess: (state, action: ActionIdPayload) => {
      state.texts[action.payload].save = true;
    },
    saveTextError: (
      state,
      action: PayloadAction<{ id: string; error: unknown }>
    ) => {
      state.texts[action.payload.id].save = action.payload.error;
    },
    clearSaveData: (state, action: PayloadAction<string>) => {
      state.texts[action.payload].save = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  clearError,
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

export const selectTextsArray = () => (state: rootState) =>
  Object.keys(state.texts.texts).map((textKey) => state.texts.texts[textKey]);

export const selectText = (id: string) => (state: rootState) =>
  state.texts.texts[id];
