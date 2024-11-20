import { act, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { MovieContext } from "../context/moviesContext"
import BookTicket from "../components/BookTicket"
import userEvent from '@testing-library/user-event';

const currentDate = new Date();
const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

global.fetch = jest.fn();

const mockMovieContext = {
    movies:[
        {
            id: 0,
            title: 'Test Movie',
            poster: '/images/moviePosters/test.jpg',
            description: 'test',
            rating: 8.5,
            genre: 'Action, Adventure',
            cinema_shows: {
              "1": ['10:00 AM', '01:00 PM'],
            },
          },
          {
            id: 1,
            title: 'Test Movie 2',
            poster: '/images/moviePosters/test.jpg',
            description: 'test 2',
            rating: 8.5,
            genre: 'Action, Adventure',
            cinema_shows: {
              "1": ['10:00 AM', '01:00 PM'],
            },
          }
        ],
    cinemas: [
            {
                "id": 1,
                "name": "Test cinema 1",
                "location": "New York, NY",
                "screens": 25,
                "seats": 5000,
                "image": "/images/cinemaPics/002.jpg"
              },
              {
                "id": 1,
                "name": "Test cinema 2",
                "location": "New York, NY",
                "screens": 25,
                "seats": 5000,
                "image": "/images/cinemaPics/002.jpg"
              }
        ],
    selectedMovie: 0,
    setSelectedMovie: jest.fn(),
    selectedCinema: "1",
    setSelectedCinema: jest.fn(),
    selectedDate:`${currentDate.getDate()}-${monthList[currentDate.getMonth()]}-${currentDate.getFullYear()}`,
    setSelectedDate: jest.fn(),
    setSelectedShowTime: jest.fn(),
    selectedShowTime:"10:00 AM"

}
describe('Book Ticket page',()=>{
    test('checking form values are same as state',async ()=>{
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext}> <BookTicket/>
            </MovieContext.Provider></BrowserRouter>)
        const defaultSelectedMovie = screen.getByLabelText('selectMovieName').value;
        const defaultSelectedCinema = screen.getByLabelText('selectCinemaName').value;
        const defaultSelectedShowDate = screen.getByLabelText('selectShowDate').value;
        const defaultSelectedShowTime = screen.getByLabelText('selectShowTime').value;
        expect(defaultSelectedMovie).toBe(mockMovieContext.selectedMovie.toString());
        expect(defaultSelectedCinema).toBe(mockMovieContext.selectedCinema);
        expect(defaultSelectedShowDate).toBe(mockMovieContext.selectedDate);
        expect(defaultSelectedShowTime).toBe(mockMovieContext.selectedShowTime);
        await act(async()=>{
            await userEvent.selectOptions(screen.getByLabelText('selectMovieName'),'1')
        })
        await act(async()=>{
            await userEvent.selectOptions(screen.getByLabelText('selectCinemaName'),'1')
        })
        await act(async()=>{
            await userEvent.selectOptions(screen.getByLabelText('selectShowTime'),'01:00 PM')
        })        
            
        expect(defaultSelectedMovie).toBe(mockMovieContext.selectedMovie.toString());
        expect(defaultSelectedCinema).toBe(mockMovieContext.selectedCinema);
        expect(defaultSelectedShowDate).toBe(mockMovieContext.selectedDate);
        expect(defaultSelectedShowTime).toBe(mockMovieContext.selectedShowTime);
    })


    test('testing Successful Ticket booking',async ()=>{
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext}> <BookTicket/>
            </MovieContext.Provider></BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

        const ticketBookingProceedButton = screen.getByLabelText('ticketBookingProceedButton');
        await act(async()=>{
            await userEvent.click(ticketBookingProceedButton);
        })
        expect(screen.getByText('Select Confirm to book ticket(s) or cancel to make changes')).toBeVisible();
        const ticketBookingConfirmPromptButton = screen.getByLabelText('ticketBookingConfirmPromptButton');
        await act(async()=>{
            await userEvent.click(ticketBookingConfirmPromptButton);
        })
        expect(screen.getByText('OK')).toBeInTheDocument();
    })

})