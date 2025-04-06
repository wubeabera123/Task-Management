"use client";

import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Modal,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TaskForm from "./TaskForm";
import { FETCH_TASKS_REQUEST } from "@/app/redux/taskSlice";


import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import {
  DELETE_TASK_REQUEST,
  TOGGLE_TASK_REQUEST,
} from "@/app/redux/taskSlice";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  };
  // onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDelete = () => {
    dispatch({ type: DELETE_TASK_REQUEST, payload: task.id });
    setOpenDeleteModal(false);
    dispatch({ type: FETCH_TASKS_REQUEST }); // ✅ re-fetch after delete
  };
  

  const handleToggleComplete = () => {
    dispatch({ type: TOGGLE_TASK_REQUEST, payload: { id: task.id, completed: !task.completed } });
    dispatch({ type: FETCH_TASKS_REQUEST }); // ✅ re-fetch after toggle
  };

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: task.completed ? "#9C9C9E" : "#F1F1F7",
          marginBottom: "10px",
          borderRadius: "5px",
          padding: "10px",
        }}
        secondaryAction={
          <Box>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => setOpenEditModal(true)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setOpenDeleteModal(true)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        }
      >
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          color="primary"
        />
        <ListItemText
          primary={task.title}
          secondary={task.description ?? ""}
          sx={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#ffffff" : "#333",
          }}
        />
      </ListItem>

      {/* Edit Task Modal */}
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <TaskForm
            initialData={task}
            onTaskCreated={() => {
              setOpenEditModal(false);
              // onTaskUpdated();
              dispatch({ type: FETCH_TASKS_REQUEST }); // ✅ use saga action
            }}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => setOpenDeleteModal(false)}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Are you sure you want to delete this task?
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button variant="outlined" onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleDelete} sx={{ backgroundColor: "red" }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskItem;
