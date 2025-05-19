import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  notification: {
    show: false,
    message: '',
    type: 'success' // 'success' ou 'error'
  }
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const movie = action.payload;
      // Vérifier si le film existe déjà dans la wishlist
      const exists = state.items.some(item => item.id === movie.id);

      if (!exists) {
        // Ajouter le film à la wishlist
        state.items.push(movie);
        // Afficher un message de succès
        state.notification = {
          show: true,
          message: 'Added to wishlist',
          type: 'success'
        };
      } else {
        // Afficher un message d'erreur
        state.notification = {
          show: true,
          message: 'Movie already exist',
          type: 'error'
        };
      }
    },
    removeFromWishlist: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter(item => item.id !== movieId);
      // Afficher un message de succès
      state.notification = {
        show: true,
        message: 'Removed from wishlist',
        type: 'success'
      };
    },
    clearWishlist: (state) => {
      state.items = [];
      // Afficher un message de succès
      state.notification = {
        show: true,
        message: 'Wishlist cleared',
        type: 'success'
      };
    },
    clearNotification: (state) => {
      state.notification = {
        show: false,
        message: '',
        type: 'success'
      };
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  clearNotification
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
