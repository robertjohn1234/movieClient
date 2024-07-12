import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteMovie({ movie, fetchData }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(movie._id);
    await fetch(`https://movie-catalog-system-api.onrender.com/movies/deleteMovie/${movie._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    .then(res => res.json())
		.then(data => {
			console.log(data);
		})
    fetchData();
    handleClose();
  };

  return (
    <>
      <Button startIcon={<DeleteIcon />} onClick={handleClickOpen}>
        {movie.isActive ? 'Archive' : 'delete'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Archive ${movie.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {movie.isActive ? 'archive' : 'delete'} this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
