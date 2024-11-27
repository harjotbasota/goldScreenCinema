import { act, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import App from "../App";

describe("Testing the header",()=>{

    test("Logo, Navigation Bar and other components are rendered",()=>{
        const {container} = render(<BrowserRouter> <App/> </BrowserRouter>);
        const headerElements = ['.logo','.logo img','.navbar','.navRight','.smallScreens','.searchIcon'];
        headerElements.forEach((element)=>{
            const elementToTest = container.querySelector(element);
            expect(elementToTest).toBeInTheDocument();
        })

        const logoText = screen.getByText("GS Cinema");
        expect(logoText).toBeVisible();
    });

    test("Search is working properly", async ()=>{
        const {container} = render(<BrowserRouter> <App/> </BrowserRouter>);
        const searchIcon = container.querySelector('.searchIcon');
        const searchBox = container.querySelector('.searchBox');
        const searchButton = container.querySelector('.searchButton');
        const searchResults = container.querySelector('.searchResults');

        // Initial display
        expect(searchIcon).toBeInTheDocument();
        expect(searchBox).toHaveStyle('display: none;'); 
        expect(searchResults).toHaveStyle('display: none;'); 

        // behavior when user clicks the search button
        await act(async ()=>{
            await userEvent.click(searchButton);
        })        
        expect(searchBox).toHaveStyle('display: flex;');
        expect(searchResults).toHaveStyle('display: flex;');
        expect(screen.getByText('Start Searching...')).toBeVisible();

        // behavior when user tries to search something relevant and irrevant
        await act(async ()=>{
            await userEvent.type(searchBox,'joker');
        })
        let userInput = within(searchResults).getByText(/joker/i);
        expect(userInput).toBeInTheDocument();
        await act(async ()=>{
            await userEvent.type(searchBox,'joker loerm ipsum');
        })
        expect(screen.getByText('No Match found')).toBeVisible();
        
    })

    test("Navigation Links are working",()=>{
        const {container} = render(<BrowserRouter> <App/> </BrowserRouter>);
        const headerContainer = container.querySelector('.headerContainer');
        const navLinks = [
            {link:'Home',path:'/'},
            {link:'Show Timings',path:'/shows'},
            {link:'Cinemas',path:'/cinemas'},
            {link:'About Us',path:'/about'},
            {link:'Login',path:'/profile'}
        ]
        navLinks.forEach(async ({link,path})=>{
            const navLink = within(headerContainer).getAllByText(link);
            for(let i=0;i<navLink.length;i++){
                await act(async()=>{
                    await userEvent.click(navLink[i]);
                })                
            }
            expect(window.location.pathname).toBe(path);
        })
    })
    
})