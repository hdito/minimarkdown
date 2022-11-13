import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirestoreError } from 'firebase/firestore';
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
  error: FirestoreError | Error | null;
};

const initialState: initialState = { texts: {}, isLoading: true, error: null };

export const textsSlice = createSlice({
  name: 'texts',
  initialState,
  reducers: {
    deleteTextFail: (state, action: ActionErrorPayload) => {
      if (action.payload instanceof FirestoreError) {
        state.error = action.payload;
        return;
      }
      state.error = new Error('Unknown error');
    },
    fetchSuccess: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    fetchError: (state, action: ActionErrorPayload) => {
      if (action.payload instanceof FirestoreError) {
        state.error = action.payload;
        return;
      }
      state.error = new Error('Unknown error');

      state.isLoading = false;
    },
    fetchTexts: (state) => {
      state.isLoading = true;
    },
    addTextError: (state, action: ActionErrorPayload) => {
      if (action.payload instanceof FirestoreError) {
        state.error = action.payload;
        return;
      }
      state.error = new Error('Unknown error');
      state.isLoading = false;
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
      if (action.payload.error instanceof FirestoreError) {
        state.texts[action.payload.id].save = action.payload.error;
        return;
      }
      state.texts[action.payload.id].save = new Error('Unknown error');
    },
    clearSaveData: (state, action: PayloadAction<string>) => {
      const text = state.texts[action.payload];
      if (text.save) text.save = null;
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
export const subscribeTexts = createAction<string>('texts/subscribeTexts');

export default textsSlice.reducer;

export const selectTextsArray = () => (state: rootState) =>
  Object.keys(state.texts.texts).map((textKey) => state.texts.texts[textKey]);

export const selectText = (id: string) => (state: rootState) =>
  state.texts.texts[id];
