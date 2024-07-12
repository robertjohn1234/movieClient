import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import AddMovie from './AddMovie';

export default function AdminView({ moviesData, fetchData }) {
  const [movies, setMovies] = useState([]);
  const [addMovieOpen, setAddMovieOpen] = useState(false);

  useEffect(() => {
    const movieArr = moviesData.map((movie, index) => (
      <TableRow key={movie._id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{movie._id}</TableCell>
        <TableCell>{movie.title}</TableCell>
        <TableCell>{movie.description}</TableCell>
        <TableCell>{movie.year}</TableCell>
        <TableCell>{movie.genre}</TableCell>
        <TableCell>
          <EditMovie movie={movie} fetchData={fetchData} />
        </TableCell>
        <TableCell>
          <DeleteMovie movie={movie} fetchData={fetchData} />
        </TableCell>
      </TableRow>
    ));

    setMovies(movieArr);
  }, [moviesData, fetchData]);

  return (
    <Paper>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setAddMovieOpen(true)}>
        Add Movie
      </Button>
      <AddMovie open={addMovieOpen} onClose={() => setAddMovieOpen(false)} fetchData={fetchData} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell colSpan="2">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
