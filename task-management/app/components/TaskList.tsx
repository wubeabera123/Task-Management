"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography, CircularProgress, Box, Button, Modal } from "@mui/material";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const [refresh, setRefresh] = useState<boolean>(false);

  const handleTaskCreated = () => {
    setOpenModal(false); // Close modal after task creation
    fetchTasks(); // Refresh the task list
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // White background
        borderRadius: "8px", // Border radius
        padding: 4, // Optional padding
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better aesthetics
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ color: "black" }}>
          Task List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add New 
        </Button>
      </Box>
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        <List>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onTaskUpdated={fetchTasks} />
          ))}
        </List>
      ) : (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} padding={"10px"}>
          <Typography>No tasks available.</Typography>
        </Box>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="add-task-modal"
        aria-describedby="add-task-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: '100%',
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            // paddingX: '10px'
          }}
        >
          <TaskForm onTaskCreated={handleTaskCreated} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
