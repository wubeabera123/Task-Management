import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import taskReducer from "./taskSlice";
import rootSaga from "./sagas";

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Add sagaMiddleware to store
export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }) // 👈 disable thunk (optional)
      .concat(sagaMiddleware),
});

// 3. Run the saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
