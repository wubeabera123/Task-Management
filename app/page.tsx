import React from 'react';
import { Container } from '@mui/material';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <Container sx={{marginTop:'60px',}}>
      <TaskList />
    </Container>
  );
}
