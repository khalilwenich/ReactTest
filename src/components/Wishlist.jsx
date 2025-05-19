import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleRemoveFromWishlist = (movieId) => {
    dispatch(removeFromWishlist(movieId));
  };
  
  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">MOVIES WISHLIST</h2>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center my-5">
              <h4>Your wishlist is empty</h4>
              <p className="mt-3">Add movies to your wishlist to see them here.</p>
              <Link to="/" className="btn btn-primary mt-2">
                Browse Movies
              </Link>
            </div>
          ) : (
            <>
              <div className="wishlist-items">
                {wishlistItems.map(movie => (
                  <div key={movie.id} className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{
                      width: '120px',
                      height: '80px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#aaa" className="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                      </svg>
                    </div>
                    <div className="flex-grow-1">
                      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h5 className="mb-0">{movie.title}</h5>
                      </Link>
                    </div>
                    <Button 
                      variant="light"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(movie.id)}
                      className="ms-2 border"
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <Button 
                  variant="outline-secondary" 
                  onClick={handleClearWishlist}
                  className="px-4"
                >
                  Clear wishlist
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Wishlist;
