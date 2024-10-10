import React, { useContext, useEffect } from 'react';
import '../styles/Shows.css';
import { useState } from 'react';
import { MovieContext } from '../context/moviesContext';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import {  useNavigate } from 'react-router-dom';

const Shows = () => {
  let currentDate = new Date();
  const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let showDates = [];
  const [activeButton, setActiveButton] = useState(0);
  const {movies,cinemas,selectedDate,setSelectedDate,setSelectedMovie,setSelectedCinema,setSelectedShowTime} = useContext(MovieContext);
  const [expanddetail, setExpandDetail] = useState([]);
  const navigate = useNavigate();
  const handleTimeButtonClick = (e,movieid,cinemaid,showTime)=>{
    e.preventDefault();
    setSelectedMovie(movieid);
    setSelectedCinema(String(cinemaid));
    setSelectedShowTime(showTime);
    console.log('The current cinema id :', cinemaid);
    navigateToBookTicket();
  }
  const navigateToBookTicket = ()=> navigate('/bookTicket');
  for(let i=0;i<10;i++){
    const date = `${currentDate.getDate()}-${monthList[currentDate.getMonth()]}-${currentDate.getFullYear()}`    
    showDates.push(<li key={currentDate} >
      <div className={`dateButtons ${activeButton === i ? 'active' : ''}`}  
      onClick={()=>{setActiveButton(i); setSelectedDate(date); }}>
            <p className='dateText'>{currentDate.getDate()} </p>
            <p className='monthText'>{monthList[currentDate.getMonth()]}</p>
      </div>
      </li>);
    currentDate.setDate(currentDate.getDate()+1);
  }


  return (
    <div className='shows'>
      <div className='showsTitle'> <p>Show Timings</p></div>
      <ul className='showDateContainer'>
        {showDates}
      </ul>
      
      <div className='showsContainer'>
          {
            movies.map((movie)=>(
              <div className='movieShow'>
                <div className='movieShowLeft'>
                  <p>{movie.title}</p>
                  <p>Ratings: {movie.rating} , Genre: {movie.genre}</p>
                </div>
                <div className='movieShowRight'>
                  <p style={{color:'green', fontSize:'x-large'}}> ${movie.ticketPrice} only</p>
                  <p> <AccessibleIcon/> </p>
                  <p onClick={()=>{setExpandDetail([...expanddetail,movie.id])}} style={{ display: expanddetail.includes(movie.id) ? 'none' : 'block' }}> <AddIcon/> </p>
                  <p onClick={()=>{setExpandDetail(expanddetail.filter((id)=> id !== movie.id))}}  style={{ display: expanddetail.includes(movie.id) ? 'block' : 'none' }}> <RemoveIcon/> </p>
                </div>
                <div className='showDetailedView' style={{ display: expanddetail.includes(movie.id) ? 'block' : '' }}>
                  {
                    Object.keys(movie.cinema_shows).map((id)=>{
                        return cinemas.map((cinema)=>{
                          return cinema.id == id ?
                           <div className='cinemaAndShowContainer' key={cinema.id}>
                            <hr/>
                             <p>{cinema.name} </p>
                             <div className='showTimingButtons'>
                              {Object.values(movie.cinema_shows[id]).map((show)=>(
                              <button onClick={(e)=>{handleTimeButtonClick(e,movie.id,cinema.id,show)}}>{show}</button>                              
                              ))}
                              </div>
                           </div> 
                           : null
                        })
                    })
                  }
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default Shows
