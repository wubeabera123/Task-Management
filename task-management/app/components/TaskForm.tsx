'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface TaskFormProps {
  onTaskCreated: () => void; // Callback to refresh the task list
  initialData?: {
    id?: number;
    title: string;
    description?: string;
  }; // Optional for edit functionality
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, initialData }) => {
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        // Update an existing task
        await axios.put(`/api/tasks/${initialData.id}`, { title, description });
      } else {
        // Create a new task
        await axios.post('/api/tasks', { title, description });
      }
      onTaskCreated();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5">{initialData?.id ? 'Edit Task' : 'Add Task'}</Typography>
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
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Saving...' : initialData?.id ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;