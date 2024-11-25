const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authController = require('../Controllers/userController');
const User = require('../Models/users');
require('dotenv').config();

jest.mock('../Models/users');

const app = express();
app.use(express.json());
app.post('/signup', authController.signUpUserController);
app.post('/login',authController.logInUserController);

describe('POST /auth/signup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user successfully', async () => {
        const mockHashedPassword = 'hashedPassword123';
        const mockUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: mockHashedPassword
        };
        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/signup')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Account Created.' });
        expect(User.create).toHaveBeenCalledWith(mockUser);
    });

    test('should not create new user if email or username is not unique',async()=>{
        const mockHashedPassword = 'hashedPassword123';
        const mockUser = {
            username: 'testuser',
            email: 'test@example.com',
            password: mockHashedPassword
        };
        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        User.findOne.mockResolvedValue({username:'testuser'});

        const response = await request(app)
            .post('/signup')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: 'Username Or Email Not Available !!! Try different Credentails' });
    })

});

describe('POST /auth/login', ()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should log in successfully with correct credentials', async () => {
        const mockUser  = {
            email: 'test@example.com',
            password: await bcrypt.hash('Password@123', 10), 
            username: 'testuser',
            save: jest.fn().mockReturnValue(true) 
        };

        User.findOne.mockResolvedValue(mockUser );
        bcrypt.compare = jest.fn().mockResolvedValue(true); 

        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'Password@123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Login Successful',
            Access_Token: expect.any(String), 
        });
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('Password@123', mockUser .password);
    });

    test('should fail to log in with incorrect password', async () => {
        const mockUser = {
            email: 'test@example.com',
            password: 'hashedPassword123',
        };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        const response = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'wrongPassword',
            });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Invalid Password' });
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', mockUser.password);
    });
});

