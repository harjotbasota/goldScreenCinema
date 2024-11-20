import React from 'react';
import { render, screen, act} from '@testing-library/react';
import Login from '../components/Login'; // Adjust the import based on your file structure
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { MovieContext } from '../context/moviesContext';

global.fetch = jest.fn();
const mockMovieContext = {
    accessToken: 'mockAccessToken',
    setAccessToken: jest.fn()
}
describe('Sign up form ', () => {
    test('Successful Login', async () => {
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext}> <Login />  </MovieContext.Provider>
            </BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

    
        const submitButton = screen.getByLabelText('loginFormSubmit');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const passwordInput = screen.getByPlaceholderText('********');
        
        await act(async()=>{
            await userEvent.type(emailInput,'testUser@email.com');
            await userEvent.type(passwordInput,'testUserPassword');
            await userEvent.click(submitButton);
        })
        expect(fetch).toHaveBeenCalled();
        expect(screen.queryByText('You are now logged in')).toBeVisible();
    })

    test('Guest User Login', async () => {
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext}> <Login />  </MovieContext.Provider>
            </BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

    
        const submitButton = screen.getByLabelText('guestLoginFormSubmit');
        
        await act(async()=>{
            await userEvent.click(submitButton);
        })
        expect(fetch).toHaveBeenCalled();
        expect(screen.queryByText('You are now logged in')).toBeVisible();
    })

    test('Failed Login', async () => {
        render(<BrowserRouter>
            <MovieContext.Provider value={mockMovieContext}> <Login />  </MovieContext.Provider>
            </BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Not ok' }),
        });

    
        const submitButton = screen.getByLabelText('loginFormSubmit');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const passwordInput = screen.getByPlaceholderText('********');
        
        await act(async()=>{
            await userEvent.type(emailInput,'testUser@email.com');
            await userEvent.type(passwordInput,'testUserPassword');
            await userEvent.click(submitButton);
        })
        expect(fetch).toHaveBeenCalled();
        expect(screen.queryByText('Not ok')).toBeVisible();
    })

})