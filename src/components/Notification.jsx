import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { clearNotification } from '../store/wishlistSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.wishlist.notification);

  useEffect(() => {
    if (notification.show) {
      // Masquer la notification après 2 secondes
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);

      // Nettoyer le timer lors du démontage du composant
      return () => clearTimeout(timer);
    }
  }, [notification.show, dispatch]);

  if (!notification.show) {
    return null;
  }

  return (
    <div className="notification-container" style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <Alert variant={notification.type === 'success' ? 'success' : 'danger'}>
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
