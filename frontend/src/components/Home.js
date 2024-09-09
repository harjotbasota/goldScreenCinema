import '../styles/Home.css';
import { useContext } from 'react';
import { MovieContext } from '../context/moviesContext';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ComingSoonMoviesContext } from '../context/comingSoonMoviesContext';

const Home = () => {
  const {movies} = useContext(MovieContext);
  const {comingSoonMovies} = useContext(ComingSoonMoviesContext);

  return (
    <div className='home'>
      <div className='slides'>
        five slides here
      </div>
      <div className='homeNav'>
        nav bar here
      </div>
      <div className='sectionHeading'>
        <h1>Now Showing</h1>
      </div>
      <div className='nowShowing'>
        { movies.map((movie)=> (
          <div key={movie.id} className='nowShowingContainers'> 
            <img src={movie.poster} alt={movie.title} />
            <div className='movieTitle'>
              <p>{movie.title}</p>
            </div>
            <div className='movieRating'>
              <p>Rating: {movie.rating}</p>
            </div>
            <div className='buttonColumn'>
              <Button>Book Ticket</Button>
              <Button> <InfoIcon /> </Button>  
            </div>
          </div>
        )) }
      </div>
      <div className='comingSoon'>
        Coming Soon movies
        {comingSoonMovies}
      </div>
      <div className='trailers'>
        trailers
      </div>
    </div>
  )
}

export default Home
