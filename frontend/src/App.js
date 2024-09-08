import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Shows from './components/Shows';
import Cinemas from './components/Cinemas';
import About from './components/About';
import Footer from './components/Footer';
import { MovieProvider } from './context/moviesContext';

function App() {
  return (
    <div className="App">
      <MovieProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home /> } > </Route>
        <Route path='/shows' element={<Shows /> } > </Route>
        <Route path='/cinemas' element={<Cinemas /> } > </Route>
        <Route path='/about' element={<About/> } > </Route>
      </Routes>
      <Footer />
      </MovieProvider>
    </div>
  );
}

export default App;
