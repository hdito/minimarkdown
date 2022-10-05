import { all } from "redux-saga/effects";
import { textsSaga } from "./textsSaga";
import { userSaga } from "./userSaga";

export function* rootSaga() {
  yield all([userSaga(), textsSaga()]);
}
