import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import NavigationBar from './components/NavigationBar'
import Movies from './components/Movies'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'
import Wishlist from './components/Wishlist'
import Notification from './components/Notification'

function App() {
  const wishlistItems = useSelector(state => state.wishlist.items);

  return (
    <Router>
      <NavigationBar wishlistCount={wishlistItems.length} />
      <Notification />
      <main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
