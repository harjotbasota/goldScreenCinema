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
              <div className='posterDescription'> <p>Description: {mymovie.description}</p> </div>
              <div className='posterDescription'> <p>Rating: {mymovie.rating} </p></div>
              <div className='posterDescription'> <p> Genre: {mymovie.genre} </p></div>
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
      
      <div className='sectionHeading'>
          <h1>Trailers</h1>
      </div>

      <div className='trailers' id='trailerssection'>
        <div className='trailerContainer'>
        <div className='trailerVideo' style={{backgroundImage:`url('/images/moviePosters/211.jpeg')`, backgroundSize:'cover'}}> <a href='https://youtu.be/SCLjS-owEig' target='blank'> <img src='/images/playButton.png'></img> </a> </div>
          <div className='trailerDetails'> 
          <h1> 211</h1>
          <ul> <li> 2 hr 3 mins </li> <li> English</li> <li> Action,Drama </li></ul></div>
        </div>
        <div className='trailerContainer'>
        <div className='trailerVideo' style={{backgroundImage:`url('/images/moviePosters/avatar.jpeg')`, backgroundSize:'cover'}}> <a href='https://youtu.be/5PSNL1qE6VY' target='blank'> <img src='/images/playButton.png'></img> </a> </div>
          <div className='trailerDetails'> 
          <h1> Avatar</h1>
          <ul> <li> 2 hr 3 mins </li> <li> English</li> <li> Action,Drama </li></ul></div>
        </div>
        <div className='trailerContainer'>
        <div className='trailerVideo' style={{backgroundImage:`url('/images/moviePosters/dark.jpeg')`, backgroundSize:'cover'}}> <a href='https://youtu.be/ESEUoa-mz2c' target='blank'> <img src='/images/playButton.png'></img> </a> </div>
          <div className='trailerDetails'> 
          <h1> Dark </h1>
          <ul> <li> 2 hr 3 mins </li> <li> English</li> <li> Action,Drama </li></ul></div>
        </div>
        <div className='trailerContainer'>
        <div className='trailerVideo' style={{backgroundImage:`url('/images/moviePosters/halloween.jpeg')`, backgroundSize:'cover'}}> <a href='https://youtu.be/ek1ePFp-nBI' target='blank'> <img src='/images/playButton.png'></img> </a> </div>
          <div className='trailerDetails'> 
          <h1> Halloween </h1>
          <ul> <li> 2 hr 3 mins </li> <li> English</li> <li> Action,Drama </li></ul></div>
        </div>
      </div>
    </div>
  )
}

export default Home
