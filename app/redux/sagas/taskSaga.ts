import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  deleteTaskSuccess,
  toggleTaskSuccess,
  updateTaskSuccess,
  FETCH_TASKS_REQUEST,
  ADD_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  TOGGLE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
} from "../taskSlice";

// Add Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* addTaskSaga(action: any): Generator<any, void, any> {
  try {
    const res = yield call(axios.post, "/api/tasks", action.payload);
    yield put(addTaskSuccess(res.data));
  } catch (error) {
    console.error("Add task error:", error);
  }
}

// Delete Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* deleteTaskSaga(action: any): Generator<any, void, any> {
  try {
    yield call(axios.delete, `/api/tasks/${action.payload}`);
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    console.error("Delete task error:", error);
  }
}

// Toggle Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* toggleTaskSaga(action: any): Generator<any, void, any> {
  try {
    const { id, completed } = action.payload;
    const res = yield call(axios.put, `/api/tasks/${id}`, { completed });
    yield put(toggleTaskSuccess(res.data));
  } catch (error) {
    console.error("Toggle task error:", error);
  }
}

// Update Task
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updateTaskSaga(action: any): Generator<any, void, any> {
  try {
    const { id, title, description } = action.payload;
    const res = yield call(axios.put, `/api/tasks/${id}`, { title, description });
    yield put(updateTaskSuccess(res.data));
  } catch (error) {
    console.error("Update task error:", error);
  }
}

// Fetch Tasks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchTasksSaga(): Generator<any, void, any> {
  try {
    const res = yield call(axios.get, "/api/tasks");
    yield put(fetchTasksSuccess(res.data));
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

// Watchers
export default function* taskSaga() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeEvery(ADD_TASK_REQUEST, addTaskSaga);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeEvery(TOGGLE_TASK_REQUEST, toggleTaskSaga);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
}
