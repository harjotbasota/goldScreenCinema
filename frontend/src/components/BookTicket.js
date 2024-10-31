import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookTicket.css'
import { MovieContext } from '../context/moviesContext';
import Seat from '@mui/icons-material/Chair';

const BookTicket = () => {
    const currentDate = new Date();
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const {selectedMovie, setSelectedMovie,movies,cinemas,selectedCinema, setSelectedCinema
    ,selectedDate,setSelectedDate,setSelectedShowTime,selectedShowTime,accessToken,setAccessToken} = useContext(MovieContext);

    const showDates = [];
    let seats = [];
    const [ticketDetails,setTicketDetails] = useState({
        movie : selectedMovie,
        cinema : selectedCinema,
        date : selectedDate,
        showTime : selectedShowTime,
        seats: []
    });
    console.log('Ticket Details: ',ticketDetails);
    const rowsInCinema = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    const seatsInRow = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    const [bookedSeats,setBookedSeats] = useState([]);
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [displayTicketBookingResponse, setDisplayTicketBookingResponse]= useState(false);

    const fetchBookedTickets = async ()=>{
        const response = await fetch('http://localhost:4000/show/bookedTickets');
        const bookedTickets = await response.json();
        console.log("Booked Tickets :",bookedTickets.message);
        setBookedSeats(bookedTickets.message);
    }

    const handleTicketBooking = async ()=>{
        setDisplayTicketBookingResponse(false);
        const response = await fetch('http://localhost:4000/show/bookTickets',{
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(ticketDetails)
        });
        
    }
    const handleSelectedMovie = (e)=>{
        setSelectedMovie(parseInt(e.target.value));
        console.log('handle selected movie');
        setSelectedCinema(Object.keys(movies[e.target.value].cinema_shows)[0]);
        setSelectedShowTime(Object.values(movies[e.target.value].cinema_shows)[0][0]);
        setSelectedSeats([]);
        fetchBookedTickets();
    }
    const handleSelectedCinema = (e) =>{
        setSelectedCinema(e.target.value);
        setSelectedSeats([]);
        const showTimes = movies[selectedMovie].cinema_shows[e.target.value];
        if (showTimes && showTimes.length > 0) {
          setSelectedShowTime(showTimes[0]);
        }
    }
    const handleSelectedTime = (e) =>{
        setSelectedShowTime(e.target.value);
        setSelectedSeats([]);
    }
    const handleSelectedDate = (e) =>{
        setSelectedDate(e.target.value);
        setSelectedSeats([]);
    }
    const handleSeatClick = (e) =>{
        const currSelectedSeat = e.target.getAttribute('value');
        if(selectedSeats.includes(currSelectedSeat)){
           const tempSelectedSeats = selectedSeats.filter((seat)=> seat != currSelectedSeat)
           setSelectedSeats(tempSelectedSeats); 
        }else{
            setSelectedSeats([...selectedSeats,currSelectedSeat]);
        }
    }

    useEffect(()=>{
        setTicketDetails({
            movie : selectedMovie,
            cinema : selectedCinema,
            date : selectedDate,
            showTime : selectedShowTime,
            seats: selectedSeats
        })
    },[selectedMovie,selectedCinema,selectedDate,selectedShowTime,selectedSeats])

    useEffect(()=>{
        fetchBookedTickets();
    },[])

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
                    <select defaultValue={selectedCinema} onChange={handleSelectedCinema}>
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
                    <select defaultValue={selectedDate} onChange={handleSelectedDate}>
                        {
                            showDates.map((date)=> date)
                        }
                    </select>
                    <label htmlFor='showTime'>Select Show Time </label>
                    <select onChange={handleSelectedTime} defaultValue={selectedShowTime}>
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
                    {
                        rowsInCinema.map((row)=>{
                            return <tr key={row} className='cinemaRows'> 
                                <td className='rowName'> {row} </td>
                                {seatsInRow.map((seatnum)=>{
                                    if(seatnum==12){
                                        return <>
                                        <td className={`${row}-spacing`} style={{width:'10px'}}></td>
                                        <td className={`seatName ${selectedSeats.includes(`${row}${seatnum}`)? 'selectedSeat':''} ${bookedSeats.includes(`${row}${seatnum}`)? 'bookedSeat':''}`}
                                        key={`${row}${seatnum}`} value={`${row}${seatnum}`} onClick={handleSeatClick}>{seatnum}</td>
                                        </>
                                    }else{
                                    return <td className={`seatName ${selectedSeats.includes(`${row}${seatnum}`)? 'selectedSeat':''} ${bookedSeats.includes(`${row}${seatnum}`)? 'bookedSeat':''}`}
                                    key={`${row}${seatnum}`}  value={`${row}${seatnum}`} onClick={handleSeatClick}>{seatnum}</td>
                                    }
                                })}
                            </tr>
                        })
                    }
                </table>
            </div>
            <div className='bookingSummary'>
                <div className='selectedShowOverview'>
                    <img src={movies[selectedMovie].poster} />
                    <div className='OtherSummary'>
                        <h2>{movies[selectedMovie].title}</h2>
                        <p> {cinemas[selectedCinema - 1].name},{cinemas[selectedCinema - 1].location}</p>
                        <p> {selectedDate} </p>
                        <p> {selectedShowTime} </p>
                    </div>
                </div>
                <div className='selectedSeatsOverview'>
                    <h4>SEATS</h4>
                    <div  className='selectedSeatsList'>
                    {
                        selectedSeats.map((thisseat)=>(
                            <div className='selectedSeatsDisplay'>{thisseat}</div>
                        ))
                    }
                    </div>
                </div>
                <div className='paymentDetailOverview'>
                    <h4>Payment Overview</h4>
                    <p> {selectedSeats.length} X ${movies[selectedMovie].ticketPrice} </p>
                    <p> Ticket Price:  ${(selectedSeats.length * movies[selectedMovie].ticketPrice).toFixed(2)}</p>
                    <p> Tax: ${(selectedSeats.length * movies[selectedMovie].ticketPrice * 0.13).toFixed(2)}</p>
                </div>
                <div className='proceedClass'>
                    <h4> Subtotal</h4>
                    <p> ${(selectedSeats.length * movies[selectedMovie].ticketPrice * 1.13).toFixed(2)}</p>
                    <button onClick={()=>{setDisplayTicketBookingResponse(true)}}>Proceed</button>
                </div>
            </div>
        </div>
        <div className='ticketBookingResponse' onClick={()=>setDisplayTicketBookingResponse(false)} style={displayTicketBookingResponse?{display:'flex'}:{display:'none'}}>
            <div className='confirmationPrompt'>
                <p> Select Confirm to book ticket(s) or cancel to make changes</p>
                <button onClick={handleTicketBooking}>Confirm</button>
                <button onClick={()=>setDisplayTicketBookingResponse(false)}>Cancel</button>
            </div>
        </div>
    </div>
  : <div style={{marginTop:'7.5vh'}}>Loading ...</div>) 
}

export default BookTicket
