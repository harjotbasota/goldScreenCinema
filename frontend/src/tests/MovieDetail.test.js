import { BrowserRouter } from "react-router-dom";
import { MovieContext } from "../context/moviesContext";
import { act,render,screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import MovieDetail from "../components/MovieDetail";

const mockNavigate = jest.fn();

jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=>mockNavigate,
    useLocation: ()=>mockLocation
}))

const mockMovieContext = {
    movies: [
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
          }
        ],
    cinemas: [
        {
            "id": 1,
            "name": "AMC Empire 25",
            "location": "New York, NY",
            "screens": 25,
            "seats": 5000,
            "image": "/images/cinemaPics/002.jpg"
          }
    ],
    setSelectedMovie : jest.fn(),
    setSelectedCinema: jest.fn(),
    setSelectedShowTime: jest.fn()
}

const mockLocation = {
    state: {movie: mockMovieContext.movies[0]}
}

describe("Book Ticket Page",()=>{
    test("Book Ticket Button ",async ()=>{
        render(
            <BrowserRouter>
                <MovieContext.Provider value={mockMovieContext}> <MovieDetail /> </MovieContext.Provider>
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

    test("Correct Movie is rendered",()=>{
        render(
            <BrowserRouter>
                <MovieContext.Provider value={mockMovieContext}> <MovieDetail/> </MovieContext.Provider>
            </BrowserRouter>
        )
        const movieTitleElement = screen.getByText('Test Movie', { exact: false });
        expect(movieTitleElement).toBeInTheDocument();
    })
})