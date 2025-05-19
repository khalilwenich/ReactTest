import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRating, calculateAverageRating } from '../services/movieService';
import { addToWishlist } from '../store/wishlistSlice';

const Movie = ({ movie, onRatingAdded }) => {
  const dispatch = useDispatch();
  const [userRating, setUserRating] = useState('');

  // Calculer la moyenne des notes
  const averageRating = calculateAverageRating(movie.ratings);

  // Ajouter à la wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(movie));
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();

    // Vérifier si la note est vide
    if (!userRating) {
      return;
    }

    // Convertir la note en nombre
    const ratingValue = parseFloat(userRating);

    // Vérifier si la note est un nombre
    if (isNaN(ratingValue)) {
      return;
    }

    // Vérifier si la note est entre 1 et 5
    if (ratingValue < 1 || ratingValue > 5) {
      alert('Please enter a rating between 1 and 5');
      return;
    }

    try {
      // Ajouter la note
      const updatedMovie = addRating(movie.id, ratingValue);
      setUserRating('');

      // Notifier le composant parent que la note a été ajoutée
      if (onRatingAdded) {
        onRatingAdded(updatedMovie);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card className="h-100 text-center">
      <div className="p-4">
        <div className="placeholder-image" style={{
          width: '100%',
          height: '200px',
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
      </div>
      <Card.Body>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Card.Title className="text-center">{movie.title}</Card.Title>
        </Link>
        <Card.Text className="text-center">
          <strong>Year:</strong> {movie.year}<br />
          <strong>Genre:</strong> {movie.genre}<br />
          <strong>Description:</strong> {movie.description}
        </Card.Text>

        <div className="mt-3 text-center">
          <h5>Movie Rating</h5>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <div className="me-2">Add your rating:</div>
            <Form onSubmit={handleRatingSubmit} className="d-flex align-items-center">
              <Form.Control
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="1-5"
                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
                style={{ width: '80px' }}
                className="me-2"
              />
              <Button type="submit" variant="primary" size="sm">
                Add
              </Button>
            </Form>
          </div>

          <div className="mt-2">
            {movie.ratings && movie.ratings.length > 0 ? (
              <div>Average rating: {averageRating}</div>
            ) : (
              <div>No ratings yet</div>
            )}
          </div>

          <Button
            variant="outline-primary"
            className="w-100 mt-3"
            onClick={handleAddToWishlist}
          >
            ADD TO WISHLIST
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Movie;
