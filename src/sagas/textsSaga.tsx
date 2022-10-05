import { nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { call, SagaReturnType, takeEvery } from "redux-saga/effects";
import { myFirestore } from "../app/firebase";
import { addTextError } from "../app/textsSlice";

function* addTextSaga(action: PayloadAction<{ uid: string }>) {
  try {
    const id = nanoid(10);
    yield setDoc(doc(myFirestore, "texts", id), {
      id,
      uid: action.payload.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    yield call(addTextError, error);
  }
}

function* saveTextSaga(
  action: PayloadAction<{ id: string; content: string; uid: string }>
) {
  const update: SagaReturnType<typeof updateDoc> = yield;
  updateDoc(doc(myFirestore, "texts", action.payload.id), {
    ...action.payload,
    updatedAt: serverTimestamp(),
  });
}

function* deleteTextSaga(action: PayloadAction<{ id: string }>) {
  yield call(deleteDoc, doc(myFirestore, "texts", action.payload.id));
}

export function* textsSaga() {
  yield takeEvery("texts/addText", addTextSaga);
  yield takeEvery("texts/saveText", saveTextSaga);
  yield takeEvery("texts/deleteText", deleteTextSaga);
}
