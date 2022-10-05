import { signInAnonymously, UserCredential } from 'firebase/auth';
import { call, put, takeEvery } from 'redux-saga/effects';
import { myAuth } from '../app/firebase';
import { signedIn, signInFailed } from '../app/userSlice';

export function* signIn() {
  try {
    const user: UserCredential = yield call(signInAnonymously, myAuth);
    const uid = user.user.uid;
    yield put(signedIn(uid));
  } catch (e) {
    yield put(signInFailed(e));
  }
}

export function* userSaga() {
  yield takeEvery('user/signIn', signIn);
}
