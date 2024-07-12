import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function UserView({ moviesData }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (moviesData) {
      

      const movieElements = moviesData.map(movie => (
        <Col key={movie._id} xs={12} md={4} className="mb-4">
          <MovieCard movieProp={movie} />
        </Col>
      ));

      setMovies(movieElements);
    //   setFilteredMovies(activeMovies);
    } else {
      setMovies([]);
    }
  }, [moviesData]);

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <h1 className="text-center mt-3">Explore Our Movies</h1>
        </Col>
      </Row>

      {/* Movies Section */}
      <Row className="mt-4">
        <Col xs={12}>
          <Row>
            {movies.length > 0 ? (
              movies
            ) : (
              <Col xs={12} className="text-center mt-4">No movies found.</Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
