import '../styles/Home.css';
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/moviesContext';
import { Button, minor } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Home = () => {
  const {movies ,comingSoonMovies} = useContext(MovieContext);
  const [movieContextReady, setMovieContextReady] = useState(false);
  let randomNumber = Math.floor(Math.random() * movies.length );


  return (
    <div className='home'>
      <div className='slides'>
          { movies.map((mymovie)=> mymovie.id == randomNumber ? <div className='frontslidwe' style={{backgroundImage:mymovie.poster}}> {mymovie.id} </div> : null)}
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

      <div className='sectionHeading'>
        <h1>Coming Soon</h1>
      </div>


      <div className='comingSoon'>
          {comingSoonMovies.map((comingSoonMovie)=>(
            <div className='comingSoonContainers' key={comingSoonMovie.id}> 
                  <img src={comingSoonMovie.poster} alt={comingSoonMovie.title} />
                  <div className='movieTitle'>
                    <p>{comingSoonMovie.title}</p>
                  </div>
                  <div className='movieRating'>
                    <p>Release Date: {comingSoonMovie.release_date} </p>
                  </div>
                  <div className='buttonColumn'>
                    <Button> View Details </Button>  
            </div>                  
            </div>
          ))}
      </div>


      <div className='trailers'>
        trailers
      </div>
    </div>
  )
}

export default Home
