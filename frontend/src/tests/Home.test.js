import { BrowserRouter } from "react-router-dom";
import { MovieContext } from "../context/moviesContext";
import Home from "../components/Home";
import { act,render,screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=>mockNavigate
}))

const mockMovieContext = {
    movies: [
        {
            id: 0,
            title: 'Test',
            poster: '/images/moviePosters/test.jpg',
            description: 'test',
            rating: 8.5,
            genre: 'Action, Adventure',
            cinema_shows: {
              "1": ['10:00 AM', '01:00 PM'],
            },
          }
        ],
    comingSoonMovies: [
        {
            id: 0,
            title: 'Test',
            poster: '/images/moviePosters/test.jpg',
            description: 'test',
            rating: 8.5,
            genre: 'Action, Adventure',
          }
    ],
    setSelectedMovie : jest.fn(),
    setSelectedCinema: jest.fn(),
    setSelectedShowTime: jest.fn()
}

describe("Testing Home Component", ()=>{
    test("Movie Detail Button ",async ()=>{
        render(
            <BrowserRouter>
                <MovieContext.Provider value={mockMovieContext}> <Home/> </MovieContext.Provider>
            </BrowserRouter>
        )
        const movieDetailButton = screen.getByLabelText(/Info about Test/i);
        await act(async ()=>{
            await userEvent.click(movieDetailButton);
        })
        expect(mockNavigate).toHaveBeenCalledWith(`/Test/details`, {state: {movie: mockMovieContext.movies[0]} })
    })

    test("Coming Soon Movie Detail Button",async ()=>{
        render(
            <BrowserRouter>
                <MovieContext.Provider value={mockMovieContext}> <Home/> </MovieContext.Provider>
            </BrowserRouter>
        )
        const movieDetailButton = screen.getByLabelText(/Coming Soon Test/i);
        await act(async ()=>{
            await userEvent.click(movieDetailButton);
        })        
        expect(mockNavigate).toHaveBeenCalledWith(`/comingSoon/Test/details`, {state: {comingSoonMovie: mockMovieContext.comingSoonMovies[0]} })    
    })

    test("Book Ticket Button ",async ()=>{
        render(
            <BrowserRouter>
                <MovieContext.Provider value={mockMovieContext}> <Home/> </MovieContext.Provider>
            </BrowserRouter>
        )
        const bookTicketButton = screen.getByLabelText(/Book Ticket Test/i);
        await act(async ()=>{
            await userEvent.click(bookTicketButton);
        })        
        expect(mockNavigate).toHaveBeenCalledWith('/bookTicket');
        expect(mockMovieContext.setSelectedMovie).toHaveBeenCalledWith(0);
        expect(mockMovieContext.setSelectedCinema).toHaveBeenCalledWith('1');
        expect(mockMovieContext.setSelectedShowTime).toHaveBeenCalledWith('10:00 AM');
    })
})