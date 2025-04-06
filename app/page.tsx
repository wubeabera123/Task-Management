'use client';

import React from 'react';
import { Container } from '@mui/material';
import TaskList from './components/TaskList';
// import MyForm from './components/MyForm';

export default function Home() {
  return (
    <div>
      <Container sx={{marginTop:'60px',}}>
        <TaskList />
      </Container>

      {/* <MyForm /> */}
    </div>
  );
}
