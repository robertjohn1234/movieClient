import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function EditMovie({ movie, fetchData }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [year, setYear] = useState(movie.year);
  const [genre, setGenre] = useState(movie.genre);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {

    await fetch(`https://movie-catalog-system-api.onrender.com/movies/updateMovie/${movie._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, description, year, genre }),
    });
    fetchData();
    handleClose();
  };

  return (
    <>
      <Button startIcon={<EditIcon />} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Genre"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
