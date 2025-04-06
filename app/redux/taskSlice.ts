import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: unknown;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Saga action types
export const FETCH_TASKS_REQUEST = "task/fetchTasksRequest";
export const ADD_TASK_REQUEST = "task/addTaskRequest";
export const DELETE_TASK_REQUEST = "task/deleteTaskRequest";
export const TOGGLE_TASK_REQUEST = "task/toggleTaskRequest";
export const UPDATE_TASK_REQUEST = "task/updateTaskRequest";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.loading = false;
    },
    fetchTasksFailure(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
      state.loading = false;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTaskSuccess(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskSuccess(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  deleteTaskSuccess,
  toggleTaskSuccess,
  updateTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;
