import { nanoid } from '@reduxjs/toolkit';
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { call, select, takeEvery } from 'redux-saga/effects';
import { myFirestore } from '../app/firebase';
import { rootState } from '../app/main';
import { addTextError } from '../app/textsSlice';
import {
  ActionIdContentPayload,
  ActionIdPayload,
  ActionUidPayload,
} from '../types/textActionTypes';
import { text } from '../types/textTypes';

function* addTextSaga(action: ActionUidPayload) {
  try {
    const id = nanoid(10);
    yield setDoc(doc(myFirestore, 'texts', id), {
      id,
      uid: action.payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    yield call(addTextError, error);
  }
}

function* saveTextSaga(action: ActionIdContentPayload) {
  const getText = (state: rootState) =>
    state.texts.texts.find((text) => text.id === action.payload.id);
  const text: text | null = yield select(getText);
  if (!text) throw Error('Invalid id');
  yield text.content !== action.payload.content
    ? updateDoc(doc(myFirestore, 'texts', action.payload.id), {
        content: action.payload.content,
        updatedAt: serverTimestamp(),
      })
    : call(console.log, 'no changes');
}

function* deleteTextSaga(action: ActionIdPayload) {
  yield call(deleteDoc, doc(myFirestore, 'texts', action.payload));
}

export function* textsSaga() {
  yield takeEvery('texts/addText', addTextSaga);
  yield takeEvery('texts/saveText', saveTextSaga);
  yield takeEvery('texts/deleteText', deleteTextSaga);
}
