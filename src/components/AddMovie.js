import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

export default function AddMovie({ open, onClose, fetchData }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://movie-catalog-system-api.onrender.com/movies/addMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, director, year, description, genre }),
    });

    if (response.ok) {

      setTitle('');
      setDirector('');
      setYear('');
      setDescription('');
      setGenre('');

      fetchData();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" component="h2">
          Add New Movie
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add
        </Button>
      </Box>
    </Modal>
  );
}
