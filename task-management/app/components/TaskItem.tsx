'use client';

import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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
    
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onTaskUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`/api/tasks/${task.id}`, {
        completed: !task.completed,
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <ListItem
    sx={{
      backgroundColor: task.completed ? '#9C9C9E': '#F1F1F7', // Change this to your desired color
      marginBottom: '10px', // Optional: Adds space between items
      borderRadius: '5px', // Optional: Adds rounded corners
      padding: '10px', // Optional: Adds padding inside the item
      
    }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={handleToggleComplete}
        color="primary"
      />
      <ListItemText
        primary={task.title}
        secondary={task.description || ''}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#ffffff' : '#333',
        }}
      />
    </ListItem>
  );
};

export default TaskItem;
