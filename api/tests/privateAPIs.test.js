const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Ticket = require('../Models/bookTickets');
const User = require('../Models/users');
const authMiddleware = require('../Middlewares/verifyJWT'); 
const { bookTicketController } = require('../Controllers/showsController');
const { profileInfoController } = require('../Controllers/profileInfoController')

const app = express();
app.use(express.json());
app.post('/booktickets',authMiddleware.verifyJWT, bookTicketController);
app.get('/profile', profileInfoController);

jest.mock('../Models/bookTickets');
jest.mock('../Models/users');

describe('Private APIs testing', () =>{
    test('should book tickets successfully', async () => {
        const mockUser  = { username: 'testuser', bookedShows: [], save: jest.fn().mockResolvedValue(true) };
        const mockTicket = {
            movieID: 1,
            cinemaID: 1,
            showDate: '2023-10-01',
            showTime: '18:00',
            bookedSeats: [],
            save: jest.fn().mockResolvedValue(true)
        };
    
        User.findOne.mockResolvedValue(mockUser );
        Ticket.findOne.mockResolvedValue(null);
        Ticket.create.mockResolvedValue(mockTicket);
    
        const req = { body: { movie: 1, cinema: 1, date: '2023-10-01', showTime: '18:00', seats: ['A1', 'A2'] }, user: 'testuser' };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await bookTicketController(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Your ticket has been booked' });
        expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    });
    
    test('should return error when trying to book already booked seats', async () => {
        const mockUser  = { username: 'testuser', bookedShows: [] };
        const mockTicket = {
            movieID: 1,
            cinemaID: 1,
            showDate: '2023-10-01',
            showTime: '18:00',
            bookedSeats: ['A1', 'A2'] 
        };
    
        User.findOne.mockResolvedValue(mockUser );
        Ticket.findOne.mockResolvedValue(mockTicket); 
    
        const req = { body: { movie: 1, cinema: 1, date: '2023-10-01', showTime: '18:00', seats: ['A1', 'A3'] }, user: 'testuser' };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await bookTicketController(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'One or more selected seats are not available' });
    });

    test('should return user profile information when the user exists', async () => {
        const mockUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            bookedShows: ['show1', 'show2']
        };
    
        User.findOne.mockResolvedValue(mockUser);
    
        const req = { user: 'testuser' };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await profileInfoController(req, res);
    
        expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: {
                username: 'testuser',
                email: 'testuser@example.com',
                bookedShows: ['show1', 'show2']
            }
        });
    });
    
})

