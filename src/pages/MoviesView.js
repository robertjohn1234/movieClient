import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function MovieView() {

  const { movieId } = useParams();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {

    fetch(`https://movie-catalog-system-api.onrender.com/movies/getMovie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data.movie) {
          setTitle(data.movie.title);
          setDirector(data.movie.director);
          setYear(data.movie.year);
          setDescription(data.movie.description);
          setGenre(data.movie.genre);
          setComments(data.movie.comments);
        } else {
          setError('Movie not found');
        }
      });
  }, [movieId]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    const commentData = {
      comment: newComment
    };

    fetch(`https://movie-catalog-system-api.onrender.com/movies/addComment/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(commentData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Comment added successfully') {
          setComments([...comments, data.updatedMovie.comments[data.updatedMovie.comments.length - 1]]);
          setNewComment("");
          Swal.fire({
            icon: 'success',
            title: 'Comment added',
            text: 'Your comment has been added successfully.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error || 'There was an error adding your comment.'
          });
        }
      })
      .catch(err => {
        console.error('Error adding comment:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding your comment.'
        });
      });
  };

  return (
    !user.id ?
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
        <h2>Please Login to view the movie.</h2>
        <Link className='btn btn-danger' to="/login">Login</Link>
      </Container>
      :
      <Container className="mt-5">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body className="text-center">
                {error ? (
                  <p>{error}</p>
                ) : (
                  <>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Director:</Card.Subtitle>
                    <Card.Text>{director}</Card.Text>
                    <Card.Subtitle>Year:</Card.Subtitle>
                    <Card.Text>{year}</Card.Text>
                    <Card.Subtitle>Genre:</Card.Subtitle>
                    <Card.Text>{genre}</Card.Text>

                    <Button onClick={handleToggleComments} className="mt-3">
                      {showComments ? 'Hide Comments' : 'Show Comments'}
                    </Button>

                    {showComments && (
                      <>
                        <Card.Subtitle className="mt-3">Comments:</Card.Subtitle>
                        {comments.length > 0 ? (
                          comments.map((comment, index) => (
                            <div key={index} style={{ marginBottom: '1rem' }}>
                              <strong>{comment.user}</strong> <span style={{ color: 'gray', fontSize: '0.8rem' }}>({new Date(comment.date).toLocaleDateString()})</span>
                              <p>{comment.comment}</p>
                            </div>
                          ))
                        ) : (
                          <p>No comments yet.</p>
                        )}
                      </>
                    )}

                    <Form className="mt-3">
                      <Form.Group>
                        <Form.Label>Add a Comment</Form.Label>
                        <Form.Control
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write your comment here"
                        />
                      </Form.Group>
                      <Button onClick={handleAddComment} className="mt-2">Add Comment</Button>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}
