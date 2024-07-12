import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ movieProp }) {
  const { _id, title, director, year, genre} = movieProp;

  return (
    <Card style={{ border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mt-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Director: {director}</Card.Text>
        <Card.Text>Year: {year}</Card.Text>
        <Card.Text>Genre: {genre}</Card.Text>
        <Link to={`/movies/${_id}`} className="btn btn-primary">Details</Link>
      </Card.Body>
    </Card>
  );
}
