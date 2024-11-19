import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';


test("Header and footer is present",()=>{
  const {container} = render( <BrowserRouter> <App/> </BrowserRouter>);
  const header = container.querySelector('.headerContainer');
  const footer = container.querySelector('.footer');
  expect(header).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});

test("Critical routes are Loaded",()=>{
  const routesToTest = [
    {path:'/',divToBePresent:'.home'},
    {path:'/bookTicket',divToBePresent:'.bookTicketPage'},
    {path:'/shows',divToBePresent:'.shows'},
    {path:'/signUp',divToBePresent:'.signUp'},
    {path:'/Login',divToBePresent:'.Login'},
    {path:'/profile',divToBePresent:'.profilePage'}
  ];
  routesToTest.forEach(({path,divToBePresent})=>{
    const {container} = render( <MemoryRouter initialEntries={[path]}>  <App/> </MemoryRouter>);
    const element = container.querySelector(divToBePresent);
    expect(element).toBeInTheDocument();
  })
})