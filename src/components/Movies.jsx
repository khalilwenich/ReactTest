import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Movie from './Movie';
import { getMoviesWithRatings } from '../services/movieService';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // Charger les films avec leurs notes
  const loadMovies = () => {
    const moviesWithRatings = getMoviesWithRatings();
    setMovies(moviesWithRatings);

    // Si une recherche a été effectuée, filtrer les films selon le terme de recherche
    if (isSearched && searchTerm.trim() !== '') {
      const filtered = moviesWithRatings.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(moviesWithRatings);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Gérer la mise à jour d'un film après l'ajout d'une note
  const handleRatingAdded = (updatedMovie) => {
    // Mettre à jour la liste des films
    loadMovies();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearched(true);

    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
      return;
    }

    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Movies Collection</h1>

      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit" className="ms-2">
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {isSearched && filteredMovies.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No result found</h3>
        </div>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {filteredMovies.map(movie => (
            <Col key={movie.id}>
              <Movie movie={movie} onRatingAdded={handleRatingAdded} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Movies;
