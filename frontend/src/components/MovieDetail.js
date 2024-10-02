import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieContext } from '../context/moviesContext';

const MovieDetail = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const cinemasdata = useContext(MovieContext);
    console.log(cinemasdata.cinemas);
  return (
    <div className='movieDetail' style={{marginTop:'7.5vh',height:'85vh'}}>
      <p className='infoHeader'> Title: <span className='info'>{movie.title}</span> </p>
      <p className='infoHeader'> Rating: <span className='info'>{movie.rating}</span> </p>
      <p className='infoHeader'> Description: <span className='info'>{movie.description}</span> </p>
      <p className='infoHeader'> Genre: <span className='info'>{movie.genre}</span> </p>
      <p className='infoHeader'> Release Date: <span className='info'>{movie.release_date}</span> </p>
      <p className='infoHeader'> Ticket Price: <span className='info'>{movie.ticketPrice}</span> </p>
      <p> </p>
      {
        Object.entries(movie.cinema_shows).map(([cinema,shows])=>{
            return Object.entries(cinemasdata.cinemas).map(([cinemaid,cinemadetails])=>{
                return cinemaid == cinema -1 ? <div> 
                    <p style={{color: 'red'}}>{cinemadetails.name} {cinemadetails.location} </p> 
                    <p> {shows.join(' , ')} </p>
                    
                    
                    
                    </div> : null
            })
        })
      }
    </div>
  )
}

export default MovieDetail
