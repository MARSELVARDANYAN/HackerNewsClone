import React, { useState } from 'react';
import { registerUser } from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Registration was successful!');
      navigate('/login'); 
    } catch (err) {
      alert('Registration error: ' + err.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' , backgroundColor: '#ff6600' } }
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
