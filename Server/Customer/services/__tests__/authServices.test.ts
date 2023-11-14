import request from 'supertest';
import express from 'express';
import authRouter from '../authServices';
import * as UsersController from '../../controllers/authController';
import * as checkAuth from '../../middlewares/check-auth';

jest.mock('../../middlewares/check-auth', () => ({
   
    verifyToken: jest.fn((req, res, next) => next()),
    isCustomer: jest.fn((req, res, next) => next()),

}));

jest.mock('../../controllers/authController', () => ({
  register: jest.fn((req, res) => res.status(200).json({ message: 'User registered' })),
  login: jest.fn((req, res) => res.status(200).json({ message: 'User logged in' })),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Authentication Services', () => {
  it('GET /auth/allAccess - should return public content', async () => {
    const res = await request(app).get('/auth/allAccess');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Public Content.');
  });

  it('GET /auth/customerAccess - should return customer content', async () => {
    const res = await request(app).get('/auth/customerAccess');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Customer Content.');
    expect(checkAuth.verifyToken).toHaveBeenCalled();
    expect(checkAuth.isCustomer).toHaveBeenCalled();
  });

  it('POST /auth/register - should register a user', async () => {
    const userData = { username: 'testUser', password: 'testPass' };
    const res = await request(app).post('/auth/register').send(userData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User registered' });
    
    // Access the mock instance of the register function
    const mockRegister = UsersController.register as jest.Mock;
    // The first call to the function, and its first argument (the req object)
    const req = mockRegister.mock.calls[0][0];
    // We check for properties that should be defined on an Express req object
    expect(req).toHaveProperty('body');
    expect(req.body).toEqual(userData);

    // The second argument (the res object)
    const resMock = mockRegister.mock.calls[0][1];
    expect(resMock).toHaveProperty('status');
    expect(typeof resMock.status).toBe('function');
  });


  it('POST /auth/login - should log in a user', async () => {
    const loginData = { username: 'testUser', password: 'testPass' };
    const res = await request(app).post('/auth/login').send(loginData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User logged in' });
    
    // Access the mock instance of the login function
    const mockLogin = UsersController.login as jest.Mock;
    // The first call to the function, and its first argument (the req object)
    const req = mockLogin.mock.calls[0][0];
    // We check for properties that should be defined on an Express req object
    expect(req).toHaveProperty('body');
    expect(req.body).toEqual(loginData);

    // The second argument (the res object)
    const resMock = mockLogin.mock.calls[0][1];
    expect(resMock).toHaveProperty('status');
    expect(typeof resMock.status).toBe('function');
  });
});
