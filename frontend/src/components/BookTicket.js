import React, { useContext, useEffect } from 'react';
import '../styles/BookTicket.css'
import { MovieContext } from '../context/moviesContext';

const BookTicket = () => {
    const {selectedMovie, setSelectedMovie,movies,cinemas,selectedCinema, setSelectedCinema} = useContext(MovieContext);
    const handleSelectedMovie = (e)=>{
        setSelectedMovie(e.target.value);
    }
    useEffect(()=>{
        setSelectedCinema(Object.keys(movies[selectedMovie].cinema_shows)[0]);
    },[selectedMovie])
    const handleSelectedCinema = (e) =>{
        setSelectedCinema(e.target.value);
    }

    
  return (
    <div className='bookTicketPage'>
      <div className='bookTicketTitle'> <p> Book Tickets</p> </div>
        <div className='showDetailSelectionContainer'>
            <div className='showOptionsSelection'>
                <form>
                    <label htmlFor='movieName'> Movie</label>
                    <select defaultValue={selectedMovie} onChange={handleSelectedMovie}>
                        {
                            movies.map((movie)=>{
                                return <option key={movie.id} value={movie.id}> {movie.title} </option>
                            })
                        }
                    </select><br/>
                    <label htmlFor='cinemaName'> Cinema </label>
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
                    </select><br/>
                    <label htmlFor='showDate'> Date </label>
                    <select defaultValue="option1">
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select><br/>
                    <label htmlFor='showTime'> Time </label>
                    <select defaultValue="option1">
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </form>
            </div>
            <div className='seatSelection'>
                seat selection
            </div>
        </div>
    </div>
  )
}

export default BookTicket
