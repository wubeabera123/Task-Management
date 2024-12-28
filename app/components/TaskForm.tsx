'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface TaskFormProps {
  onTaskCreated: () => void; // Callback to refresh the task list
  onClose: () => void; // Callback to close the form/modal
  initialData?: {
    id?: number;
    title: string;
    description?: string;
  }; // Optional for edit functionality
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, onClose, initialData }) => {
  const [title, setTitle] = useState<string>(initialData?.title?? '');
  const [description, setDescription] = useState<string>(initialData?.description ?? '');
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
      onClose(); // Close the form/modal after saving
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
      sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ color: 'black', paddingY: '10px' }}>
          {initialData?.id ? 'Edit Task' : 'Add Task'}
        </Typography>
        <IconButton onClick={onClose} >
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ marginTop: '20px', maxWidth: '150px', width: '100%' }}
        >
          {loading ? 'Saving...' : initialData?.id ? 'Update Task' : 'Create Task'}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
