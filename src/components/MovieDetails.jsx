import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const foundMovie = getMovieById(parseInt(id));
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <Container className="text-center py-5">
        <h2>Movie not found</h2>
        <Button variant="primary" onClick={() => navigate('/')} className="mt-3">
          Return to Movies
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return <div className="text-center py-5">Loading...</div>;
  }



  return (
    <Container className="py-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>

      <Card>
        <Row className="g-0">
          <Col md={4} className="d-flex align-items-center justify-content-center p-4">
            <div className="placeholder-image" style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#aaa" className="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </div>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as="h1">{movie.title}</Card.Title>
              <Card.Text as="div">
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Description:</strong> {movie.description}</p>


              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MovieDetails;
