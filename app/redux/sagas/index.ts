import { all } from "redux-saga/effects";
import taskSaga from "./taskSaga";
//root saga where all sagas are registered
export default function* rootSaga() {
  yield all([
    taskSaga(), // register task sagas
  ]);
}
