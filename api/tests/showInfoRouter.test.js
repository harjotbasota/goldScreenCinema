const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Ticket = require('../Models/bookTickets');
const User = require('../Models/users');
const authMiddleware = require('../Middlewares/verifyJWT'); 
const { bookTicketController, bookedTicketsController } = require('../Controllers/showsController');

const app = express();
app.use(express.json());
app.post('/book-ticket',authMiddleware.verifyJWT, bookTicketController);
app.get('/booked-tickets', bookedTicketsController);

jest.mock('../Models/bookTickets');
jest.mock('../Models/users');

describe('Booked Tickets Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should return booked seats for a specific movie, cinema, date, and time', async () => {
        const mockBookedTicket = {
            movieID: 1,
            cinemaID: 1,
            showDate: '2023-10-01',
            showTime: '18:00',
            bookedSeats: ['A1', 'A2']
        };
    
        Ticket.findOne.mockResolvedValue(mockBookedTicket);
    
        const req = {
            query: {
                movieID: '1',
                cinemaID: '1',
                showDate: '2023-10-01',
                showTime: '18:00'
            }
        };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await bookedTicketsController(req, res);
    
        expect(Ticket.findOne).toHaveBeenCalledWith({
            movieID: 1,
            cinemaID: 1,
            showDate: '2023-10-01',
            showTime: '18:00'
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ seats: ['A1', 'A2'] });
    });

});