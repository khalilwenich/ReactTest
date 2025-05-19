import moviesData from '../movies.json';

// Clé pour stocker les notes dans localStorage
const RATINGS_STORAGE_KEY = 'movie_ratings';

// Récupérer les films avec leurs notes depuis localStorage ou utiliser les données par défaut
const getMoviesWithRatings = () => {
  const storedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
  
  if (storedRatings) {
    const ratingsMap = JSON.parse(storedRatings);
    
    // Fusionner les données des films avec les notes stockées
    return moviesData.map(movie => {
      const movieRatings = ratingsMap[movie.id] || [];
      return {
        ...movie,
        ratings: movieRatings
      };
    });
  }
  
  return moviesData;
};

// Récupérer un film spécifique avec ses notes
const getMovieById = (id) => {
  const movies = getMoviesWithRatings();
  return movies.find(movie => movie.id === parseInt(id));
};

// Ajouter une note à un film
const addRating = (movieId, rating) => {
  // Vérifier que la note est entre 1 et 5
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  // Récupérer les notes existantes ou initialiser un objet vide
  const storedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
  const ratingsMap = storedRatings ? JSON.parse(storedRatings) : {};
  
  // Récupérer les notes du film ou initialiser un tableau vide
  const movieRatings = ratingsMap[movieId] || [];
  
  // Ajouter la nouvelle note
  movieRatings.push(rating);
  
  // Mettre à jour les notes du film
  ratingsMap[movieId] = movieRatings;
  
  // Sauvegarder dans localStorage
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratingsMap));
  
  return getMovieById(movieId);
};

// Calculer la moyenne des notes d'un film
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0;
  }
  
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

export { getMoviesWithRatings, getMovieById, addRating, calculateAverageRating };
