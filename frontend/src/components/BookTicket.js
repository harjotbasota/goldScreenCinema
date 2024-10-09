import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookTicket.css'
import { MovieContext } from '../context/moviesContext';
import Seat from '@mui/icons-material/Chair';

const BookTicket = () => {
    const currentDate = new Date();
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const {selectedMovie, setSelectedMovie,movies,cinemas,selectedCinema, setSelectedCinema
    ,selectedDate,setSelectedDate,setSelectedShowTime,selectedShowTime} = useContext(MovieContext);
    const showDates = [];
    let seats = [];
    const [ticketDetails,setTicketDetails] = useState({
        movie : selectedMovie,
        cinema : selectedCinema,
        date : selectedDate,
        showTime : selectedShowTime
    });


    const handleSelectedMovie = (e)=>{
        setSelectedMovie(parseInt(e.target.value));
    }
    const handleSelectedCinema = (e) =>{
        setSelectedCinema(e.target.value);
    }
    const handleSelectedTime = (e) =>{
        setSelectedShowTime(e.target.value);
    }

    useEffect(()=>{
        if(movies.length > 0 && selectedMovie != undefined){
            setSelectedCinema(Object.keys(movies[selectedMovie].cinema_shows)[0]);
            setSelectedShowTime(Object.values(movies[selectedMovie].cinema_shows)[0][0]);
        }        
    },[selectedMovie]);
    useEffect(()=>{
        if(movies.length > 0 && selectedMovie != undefined && selectedCinema != undefined){
          const showTimes = movies[selectedMovie].cinema_shows[selectedCinema];
          if (showTimes && showTimes.length > 0) {
            setSelectedShowTime(showTimes[0]);
          }
        }
      },[selectedCinema])

    useEffect(()=>{
        setTicketDetails({
            movie : selectedMovie,
            cinema : selectedCinema,
            date : selectedDate,
            showTime : selectedShowTime
        })
    },[selectedMovie,selectedCinema,selectedDate,selectedShowTime])

    console.log("Ticket detail :" ,ticketDetails);
    for(let i=0;i<10;i++){
        const date = `${currentDate.getDate()}-${monthList[currentDate.getMonth()]}-${currentDate.getFullYear()}`    
        showDates.push(<option key={date} value={date}>{date}</option>);
        currentDate.setDate(currentDate.getDate()+1);
    }
    for(let row=1;row<=15;row++){
        let seatsinrow = []
        for(let s=1;s<=15;s++){
            seatsinrow.push(<Seat key={`${row}-${s}`} />)
        }
        seats.push(seatsinrow);
    }


  return (movies.length > 0  ?
    <div className='bookTicketPage'>
      <div className='bookTicketTitle'> <p> Book Tickets</p> </div>
        <div className='showDetailSelectionContainer'>
            <div className='showOptionsSelection'>
                <form>
                    <label htmlFor='movieName'>Select Movie</label>
                    <select defaultValue={selectedMovie} onChange={handleSelectedMovie}>
                        {
                            movies.map((movie)=>{
                                return <option key={movie.id} value={movie.id}> {movie.title} </option>
                            })
                        }
                    </select>
                    <label htmlFor='cinemaName'> Select Cinema </label>
                    <select defaultValue={Object.keys(movies[selectedMovie].cinema_shows)[0]} onChange={handleSelectedCinema}>
                        {
                            movies.map((movie)=>{
                                return movie.id == selectedMovie ? 
                                    Object.keys(movie.cinema_shows).map((cinemaid)=>{
                                        return cinemas.map((cinema)=>{
                                            return cinema.id == cinemaid ? 
                                                <option key={cinemaid} value={cinemaid}> { cinema.name } </option>: null
                                        })
                                    })
                                    :null
                            })
                        }
                    </select>
                    <label htmlFor='showDate'>Select Date </label>
                    <select defaultValue={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}>
                        {
                            showDates.map((date)=> date)
                        }
                    </select>
                    <label htmlFor='showTime'>Select Show Time </label>
                    <select onChange={handleSelectedTime}>
                        { 
                                   movies.map((movie)=>{
                                    return movie.id == (selectedMovie || 0)? 
                                        Object.entries(movie.cinema_shows).map(([cinemaid, showTime])=>{
                                            return cinemaid == (selectedCinema || '1') ? 
                                               showTime.map((show)=>{return <option key={show} value={show}>{show} </option>})
                                               : null
                                        })
                                        :null
                                }) 
                        }
                    </select>
                </form>
            </div>
            <div className='seatSelection'>
                <img src='/images/Other/cinemaScreen.svg' />
                <div className='screenTitle'> Screen</div>
                <table>
                        
                </table>
            </div>
        </div>
    </div>
  : <div>Loading ...</div>) 
}

export default BookTicket
