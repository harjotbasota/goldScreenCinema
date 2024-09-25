import React, { useContext } from 'react';
import '../styles/Cinemas.css';
import { MovieContext } from '../context/moviesContext';
import LocationIcon from '@mui/icons-material/LocationOn';
import HdIcon from '@mui/icons-material/Hd';
import ChairIcon from '@mui/icons-material/Chair';

const Cinemas = () => {
  const {cinemas,movies} = useContext(MovieContext);

  return (
    <div className='cinemas'>
      <div className='cinemasTitle'> <p> Cinemas</p> </div>
      {
        cinemas.map((cinema)=>(
          <div key={cinema.id} className='cinemaContainer'> 
            <div className='containerLeft'> <img src={cinema.image} alt='cinema Pic' />  </div>
            <div className='containerMiddle'> 
              <h2> {cinema.name} </h2>
              <p> <LocationIcon/>  {cinema.location} </p>
              <p> <HdIcon/>  {cinema.screens} Screens </p>
              <p> <ChairIcon/>  {cinema.seats} Seats </p>
            </div>
            <div className='containerRight'> 
              <h3> Now Showing</h3>
              <div className='moviePosters'>
                {movies.map((movie)=>{
                      return Object.keys(movie.cinema_shows).map((currid)=>{
                        return currid == cinema.id ? <img  src={movie.poster} /> : null
                      })
                  })}
              </div>
              <h5> ... and more</h5>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Cinemas
