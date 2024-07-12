import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieView from './pages/MoviesView';
import Login from './pages/Login';
import Logout from './pages/Logout';
// import Error from './pages/Error';
// import Profile from './pages/Profile';
// import AddMovie from './pages/AddMovie';
import { UserProvider } from './UserContext';


function App() {

  const [ user, setUser ] = useState({
    id: null, 
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    // console.log(user);
    // console.log(localStorage);

    fetch('https://movie-catalog-system-api.onrender.com/users/details', { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if(typeof data.user !== "undefined") {

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        })

      } 
      else {

        setUser({
          id: null, 
          isAdmin: null
        })
      }
      })
    })

  return (
    <UserProvider value={{ user, setUser, unsetUser}}>
    <Router>
      <AppNavbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route exact="true" path="/movies/:movieId" element={<MovieView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </Container>
    </Router>
    </UserProvider>
  );
}

export default App;
