import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieContext } from '../context/moviesContext';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const cinemasdata = useContext(MovieContext);
    console.log(cinemasdata.cinemas);
  return (
    <div className='movieDetailPage'>
      <div className='movieDetailContainer'>
      <div className='containerLeftSide'>
          <span className='title'>{movie.title}</span>
          <p className='infoHeader'> Rating: <span className='info'>{movie.rating}</span>   </p>
          <p className='infoHeader'> Description: <span className='info'>{movie.description}</span>  </p> 
          <p className='infoHeader'> Genre:  <span className='info'>{movie.genre}</span>   </p> 
          <p className='infoHeader'> Release Date:  <span className='info'>{movie.release_date}</span>  </p> 
          <p className='infoHeader'> Ticket Price:  <span className='info'>${movie.ticketPrice}</span>  </p>
          <p className='infoHeader2'> Availabe Shows in your nearby cinemas</p>
          {
            Object.entries(movie.cinema_shows).map(([cinema,shows])=>{
                return Object.entries(cinemasdata.cinemas).map(([cinemaid,cinemadetails])=>{
                    return cinemaid == cinema -1 ? <div> 
                        <p className='cinemaName'>{cinemadetails.name} {cinemadetails.location} </p> 
                        <p className='showsDetail'> {shows.join(' , ')} </p>                 
                        
                        </div> : null
                })
            })
          }
          <button className='bookTicketButton'> BOOK TICKET </button>
      </div>
      <div className='containerRightSide'>
          <img src={movie.poster} />
      </div>
      </div>

    </div>
  )
}

export default MovieDetail
