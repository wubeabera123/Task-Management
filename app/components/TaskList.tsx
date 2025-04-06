"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchTasks } from "@/app/redux/taskSlice";
import { fetchTasksRequest } from "@/app/redux/taskSlice";

import { RootState, AppDispatch } from "@/app/redux/store";
import { List, Typography, CircularProgress, Box, Button, Modal } from "@mui/material";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.task);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTasksRequest()); // ✅ now handled by saga
  }, [dispatch]);

  return (
    <Box sx={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: 4, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: "black" }}>Task List</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>Add New</Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        <List>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" padding="10px">
          <Typography>No tasks available.</Typography>
        </Box>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="add-task-modal">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: 400, width: "100%", bgcolor: "background.paper", boxShadow: 24, p: 3, borderRadius: 2 }}>
          <TaskForm onTaskCreated={() => dispatch(fetchTasksRequest())} onClose={() => setOpenModal(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
