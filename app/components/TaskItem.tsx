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
import axios from "axios";
import TaskForm from "./TaskForm";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


// import { useEffect } from 'react';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  };
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onTaskUpdated();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`/api/tasks/${task.id}`, {
        completed: !task.completed,
      });
      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const taskStyle = {
    textDecoration: task.completed ? "line-through" : "none",
    color: task.completed ? "#ffffff" : "#333",
    maxWidth: task.description ? "500px" : "",
    width: task.description ? "100%" : "",
    "@media (min-width: 399px)": {
      maxWidth: task.description ? "200px" : "", // Small devices
    },
    "@media (min-width: 400px) and (max-width: 599)": {
      maxWidth: task.description ? "300px" : "", // Small devices
    },
    "@media (min-width: 601px) and (max-width: 960px)": {
      maxWidth: task.description ? "400px" : "", // Medium devices
    },
    "@media (min-width: 961px)": {
      maxWidth: task.description ? "600px" : "", // Large devices
    },
  };

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: task.completed ? "#9C9C9E" : "#F1F1F7", // Change this to your desired color
          marginBottom: "10px", // Optional: Adds space between items
          borderRadius: "5px", // Optional: Adds rounded corners
          padding: "10px", // Optional: Adds padding inside the item
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
          sx={taskStyle}
          // style={{
          //   textDecoration: task.completed ? 'line-through' : 'none',
          //   color: task.completed ? '#ffffff' : '#333',
          //   maxWidth: task.description ? '500px' : '',
          //   width: task.description ? '100%' : ''
          // }}
        />
      </ListItem>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-task-modal"
        aria-describedby="edit-task-modal-description"
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
            initialData={task} // Pass current task data to the form
            onTaskCreated={() => {
              setOpenEditModal(false);
              onTaskUpdated();
            }}
            onClose={() => setOpenEditModal(false)}
          />
        </Box>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="edit-task-modal"
        aria-describedby="edit-task-modal-description"
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
          <Box sx={{display: 'flex', justifyContent: 'end', alignItems: "center"}}>
            <IconButton onClick={() => setOpenDeleteModal(false)} >
            <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Typography sx={{color: '#012000', display: 'flex', justifyContent: 'center', alignItems: "center", fontWeight: 'bold'}}>Are sure you want to delete this task?</Typography>
          <Box sx={{marginTop: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
            <Button onClick={() => setOpenDeleteModal(false)} variant="outlined" sx={{paddingY: '1px'}}>Close</Button>
            <Button onClick={handleDelete} variant="contained" sx={{backgroundColor: 'red', paddingY: '1px'}}>Delete</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskItem;
