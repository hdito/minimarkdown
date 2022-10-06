import { nanoid } from '@reduxjs/toolkit';
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';
import { myFirestore } from '../app/firebase';
import {
  addTextError,
  saveTextError,
  saveTextSuccess,
} from '../app/textsSlice';
import {
  ActionIdContentPayload,
  ActionIdPayload,
  ActionUidPayload,
} from '../types/textActionTypes';

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
  try {
    yield updateDoc(doc(myFirestore, 'texts', action.payload.id), {
      content: action.payload.content,
      updatedAt: serverTimestamp(),
    });
    yield put(saveTextSuccess(action.payload.id));
  } catch (error) {
    yield put(saveTextError({ id: action.payload.id, error }));
  }
}

function* deleteTextSaga(action: ActionIdPayload) {
  yield call(deleteDoc, doc(myFirestore, 'texts', action.payload));
}

export function* textsSaga() {
  yield takeEvery('texts/addText', addTextSaga);
  yield takeEvery('texts/saveText', saveTextSaga);
  yield takeEvery('texts/deleteText', deleteTextSaga);
}
