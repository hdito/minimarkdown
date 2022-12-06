import { nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  DocumentChange,
  DocumentData,
  FirestoreError,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import { EventChannel, eventChannel } from 'redux-saga';
import * as Effects from 'redux-saga/effects';
import { put, take, takeEvery } from 'redux-saga/effects';
import { myFirestore } from '../app/firebase';
import {
  addTextError,
  addTextSuccess,
  deleteTextSuccess,
  fetchError,
  fetchSuccess,
  modifyText,
  saveTextError,
  saveTextSuccess,
} from '../app/textsSlice';
import { text, textFromServer } from '../types/textTypes';
import { user } from '@/types/user';

const call: any = Effects.call;

function* addTextSaga(action: PayloadAction<user['uid']>) {
  try {
    const id = nanoid(10);
    yield call(setDoc, doc(myFirestore, 'texts', id), {
      id,
      uid: action.payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    yield call(addTextError, error);
  }
}

function* saveTextSaga(
  action: PayloadAction<{ id: text['id']; content: text['content'] }>
) {
  try {
    yield call(updateDoc, doc(myFirestore, 'texts', action.payload.id), {
      content: action.payload.content,
      updatedAt: serverTimestamp(),
    });
    yield put(saveTextSuccess(action.payload.id));
  } catch (error) {
    yield put(saveTextError({ id: action.payload.id, error }));
  }
}

function* deleteTextSaga(action: PayloadAction<text['id']>) {
  yield call(deleteDoc, doc(myFirestore, 'texts', action.payload));
}

function subscribeTexts(uid: string) {
  return eventChannel((emitter) => {
    const unsubscribe = onSnapshot(
      query(collection(myFirestore, 'texts'), where('uid', '==', uid)),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          emitter(change);
        });
        emitter('finished');
      },
      (error) => emitter(error)
    );
    return unsubscribe;
  });
}

function* subscribeTextsSaga(action: PayloadAction<user['uid']>) {
  const textsChannel: EventChannel<Unsubscribe> = yield call(
    subscribeTexts,
    action.payload
  );
  while (true) {
    const subscribeResult:
      | DocumentChange<DocumentData>
      | FirestoreError
      | 'finished' = yield take(textsChannel);
    if (subscribeResult instanceof FirestoreError) {
      yield put(fetchError(subscribeResult));
    } else if (subscribeResult === 'finished') {
      yield put(fetchSuccess());
    } else {
      const type = subscribeResult.type;
      switch (type) {
        case 'added': {
          const docSnap = subscribeResult.doc.data() as textFromServer;
          const { id, uid, content } = docSnap;
          const newText: text = {
            id,
            uid,
            content,
            createdAt: docSnap.createdAt && docSnap.createdAt.toMillis(),
            isLocal: subscribeResult.doc.metadata.hasPendingWrites
              ? true
              : false,
          };
          if (docSnap.updatedAt) {
            newText.updatedAt = docSnap.updatedAt.toMillis();
          }
          yield put(addTextSuccess(newText));
          break;
        }
        case 'modified': {
          const docSnap = subscribeResult.doc.data() as textFromServer;
          const { id, uid, content } = docSnap;
          const newText: text = {
            id,
            uid,
            content,
            createdAt: docSnap.createdAt && docSnap.createdAt.toMillis(),
            isLocal: subscribeResult.doc.metadata.hasPendingWrites
              ? true
              : false,
          };
          if (docSnap.updatedAt) {
            newText.updatedAt = docSnap.updatedAt.toMillis();
          }
          yield put(modifyText(newText));
          break;
        }
        case 'removed': {
          yield put(deleteTextSuccess(subscribeResult.doc.data().id));
          break;
        }
      }
    }
  }
}

export function* textsSaga() {
  yield takeEvery('texts/addText', addTextSaga);
  yield takeEvery('texts/saveText', saveTextSaga);
  yield takeEvery('texts/deleteText', deleteTextSaga);
  yield takeEvery('texts/subscribeTexts', subscribeTextsSaga);
}
