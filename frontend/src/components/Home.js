import '../styles/Home.css';
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/moviesContext';
import { Button, minor } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Home = () => {
  const {movies ,comingSoonMovies} = useContext(MovieContext);
  const [randomNumber,setRandomNumber] = useState(0);
  setTimeout( ()=> {
    setRandomNumber(Math.floor(Math.random() * movies.length));
  },5000)


  return (
    <div className='home'>
          { movies.map((mymovie)=> mymovie.id == randomNumber ? 
          <div className='slide' style={{ background: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${mymovie.poster})` , backgroundRepeat:'no-repeat' , backgroundSize:'cover' }}>
            <div className='leftSideOfSlide'>
              <div className='posterTitle'> <p> {mymovie.title} </p></div>
              <div> Description: {mymovie.description} </div>
              <div> Rating: {mymovie.rating} </div>
              <div> Genre: {mymovie.genre}</div>
              <div className='buttonColumn'>
              <Button>Book Ticket</Button>
            </div>
            </div>
            <div className='rightSideOfSlide'>
              <img src={mymovie.poster} alt={mymovie.title} />
            </div>
            
          </div>: null)}

      <div className='homeNav'>
        <a href='#nowshowingsection'>Now Showing</a>
        <a href='#comingsoonsection'>Coming Soon</a>
        <a href='#trailerssection'>Trailers</a>
      </div>


      <div className='sectionHeading'>
        <h1>Now Showing</h1>
      </div>


      <div className='nowShowing' id='nowshowingsection'>
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


      <div className='comingSoon' id='comingsoonsection'>
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


      <div className='trailers' id='trailerssection'>
        trailers
      </div>
    </div>
  )
}

export default Home
