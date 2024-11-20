import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SignUp from '../components/SignUp'; // Adjust the import based on your file structure
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn();

describe('Sign up form ', () => {
    test('Successful Form submission', async () => {
        render(<BrowserRouter>
            <SignUp /> </BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

        const submitButton = screen.getByLabelText('signUpSubmitButton');

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const password1Input = screen.getAllByPlaceholderText('********')[0];
        const password2Input = screen.getAllByPlaceholderText('********')[1];

        await act(async () => {
            await userEvent.type(usernameInput, 'testUser');
            await userEvent.type(emailInput, 'xyztestuser@email.com');
            await userEvent.type(password1Input, 'testPassword123');
            await userEvent.type(password2Input, 'testPassword123');
        })
        await act(async () => {
            await userEvent.click(submitButton);
        })

        expect(fetch).toHaveBeenCalled();
        expect(screen.queryByText('Account has been created')).toBeVisible();
    })

    test('Wrong password submission', async () => {
        render(<BrowserRouter>
            <SignUp /> </BrowserRouter>)
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

        const submitButton = screen.getByLabelText('signUpSubmitButton');

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const password1Input = screen.getAllByPlaceholderText('********')[0];
        const password2Input = screen.getAllByPlaceholderText('********')[1];

        await act(async () => {
            await userEvent.type(usernameInput, 'testUser');
            await userEvent.type(emailInput, 'xyztestuser@email.com');
            await userEvent.type(password1Input, 'testPassword123');
            await userEvent.type(password2Input, 'testPassword456');
        })
        await act(async () => {
            await userEvent.click(submitButton);
        })

        expect(fetch).not.toHaveBeenCalled();
        expect(screen.queryByText('Password Must be Same')).toBeVisible();
    })

    test('Wrong Email submission', async () => {
        render(<BrowserRouter>
            <SignUp /> </BrowserRouter>)

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'ok' }),
        });

        const submitButton = screen.getByLabelText('signUpSubmitButton');

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const password1Input = screen.getAllByPlaceholderText('********')[0];
        const password2Input = screen.getAllByPlaceholderText('********')[1];

        await act(async () => {
            await userEvent.type(usernameInput, 'testUser');
            await userEvent.type(emailInput, 'xyztestuser');
            await userEvent.type(password1Input, 'testPassword123');
            await userEvent.type(password2Input, 'testPassword123');
        })
        await act(async () => {
            await userEvent.click(submitButton);
        })

        expect(fetch).not.toHaveBeenCalled();
        expect(screen.queryByText('Enter a valid Email')).toBeVisible();
    })

    test('Failed request submission', async () => {
        render(<BrowserRouter>
            <SignUp /> </BrowserRouter>)

        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Not Ok' }),
        });

        const submitButton = screen.getByLabelText('signUpSubmitButton');

        const usernameInput = screen.getByPlaceholderText('Enter username');
        const emailInput = screen.getByPlaceholderText('xyz@myemail.com');
        const password1Input = screen.getAllByPlaceholderText('********')[0];
        const password2Input = screen.getAllByPlaceholderText('********')[1];

        await act(async () => {
            await userEvent.type(usernameInput, 'testUser');
            await userEvent.type(emailInput, 'xyztestuser@gmail.com');
            await userEvent.type(password1Input, 'testPassword123');
            await userEvent.type(password2Input, 'testPassword123');
        })
        await act(async () => {
            await userEvent.click(submitButton);
        })

        expect(fetch).toHaveBeenCalled();
        expect(screen.queryByText('Not Ok')).toBeVisible();
    })

})