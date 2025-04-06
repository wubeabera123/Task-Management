// components/MyForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { get, set, del } from 'idb-keyval'; // IndexedDB helper

interface FormData {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

  // Load saved data from IndexedDB on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await get<FormData>('formData');
      if (savedData) {
        setFormData(savedData);
      }
    };
    loadSavedData();
  }, []);

  // Auto-save form data to IndexedDB whenever it changes
  useEffect(() => {
    const saveData = async () => {
      await set('formData', formData); // Save to IndexedDB
    };
    saveData();
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Clear IndexedDB after submit (optional)
    await del('formData');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MyForm;