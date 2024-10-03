import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Shows from './components/Shows';
import Cinemas from './components/Cinemas';
import About from './components/About';
import Footer from './components/Footer';
import { MovieProvider } from './context/moviesContext';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';
import ComingSoonMovieDetail from './components/ComingSoonMovieDetail';
import BookTicket from './components/BookTicket';


function App() {
  return (
    <div className="App">
      <MovieProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> } > </Route>
        <Route path= '/:movieTitle/details' element={<MovieDetail/>} > </Route>
        <Route path= '/comingSoon/:movieTitle/details' element={<ComingSoonMovieDetail/>} > </Route>
        <Route path='/bookTicket' element={<BookTicket /> } > </Route>
        <Route path='/shows' element={<Shows /> } > </Route>
        <Route path='/cinemas' element={<Cinemas /> } > </Route>
        <Route path='/about' element={<About/> } > </Route>
        <Route path='/signUp' element={<SignUp/> } > </Route>
        <Route path='/Login' element={<Login/> } > </Route>
        <Route path='/Profile' element={<Profile/> } > </Route>
      </Routes>
      <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
