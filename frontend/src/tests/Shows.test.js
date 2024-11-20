import { act, render, screen } from "@testing-library/react";
import { BrowserRouter,} from "react-router-dom";
import { MovieContext } from "../context/moviesContext";
import Shows from "../components/Shows";
import userEvent from "@testing-library/user-event";


const mockNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=>mockNavigate
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

describe('Shows Page',()=>{
    test('Show Time Button click',async ()=>{
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext} > <Shows/> </MovieContext.Provider>
        </BrowserRouter>)
        const showTimeButton = screen.getAllByLabelText('Show Time Button Test');
        await act(async ()=>{
            await userEvent.click(showTimeButton[0]);
        });
        expect(mockNavigate).toHaveBeenCalledWith('/bookTicket');
        expect(mockMovieContext.setSelectedMovie).toHaveBeenCalledWith(0);
        expect(mockMovieContext.setSelectedCinema).toHaveBeenCalledWith('1');
        expect(mockMovieContext.setSelectedShowTime).toHaveBeenCalledWith('10:00 AM');
    })

})