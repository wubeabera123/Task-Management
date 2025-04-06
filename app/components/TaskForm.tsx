"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  ADD_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
} from "@/app/redux/taskSlice";
import { AppDispatch } from "@/app/redux/store";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface TaskFormProps {
  onTaskCreated?: () => void;
  onClose: () => void;
  initialData?: {
    id?: number;
    title: string;
    description?: string;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({
  onTaskCreated,
  onClose,
  initialData,
}) => {
  const [title, setTitle] = useState<string>(initialData?.title ?? "");
  const [description, setDescription] = useState<string>(
    initialData?.description ?? ""
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData?.id) {
      dispatch({
        type: UPDATE_TASK_REQUEST,
        payload: {
          id: initialData.id,
          title,
          description,
        },
      });
    } else {
      dispatch({
        type: ADD_TASK_REQUEST,
        payload: {
          title,
          description,
        },
      });
    }

    if (onTaskCreated) onTaskCreated();
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ color: "black", paddingY: "10px" }}>
          {initialData?.id ? "Edit Task" : "Add Task"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
      />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px", maxWidth: "150px", width: "100%" }}
        >
          {initialData?.id ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
