import request from 'supertest';
import express from 'express';
import router from '../authServices'; // Update the import path according to your project structure
import * as AuthController from '../../controllers/authController';

// Mock the auth controller methods
jest.mock('../../controllers/authController', () => ({
  login: jest.fn((req, res) => res.status(200).send({ message: 'Logged in' })),
  register: jest.fn((req, res) => res.status(201).send({ message: 'Registered' }))
}));

// Create an express application and apply the auth router
const app = express();
app.use(express.json());
app.use('/auth', router);

describe('Authentication Routes', () => {
  it('should handle login', async () => {
    // Define the body for the login route
    const loginData = { username: 'test', password: 'password' };

    // Make POST request to the login route
    await request(app)
            .post('/auth/login')
            .send(loginData)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toBe('Logged in');
            })
            .catch((err) => {
                console.error('Error during login test:', err);
            });


    // Assert the login controller function was called
    expect(AuthController.login).toHaveBeenCalled();
  });

  it('should handle user registration', async () => {
    // Define the body for the registration route
    const registrationData = { username: 'test', password: 'password', email: 'test@example.com' };

    // Make POST request to the register route
    await request(app)
      .post('/auth/register')
      .send(registrationData)
      .expect(201)
      .then((response) => {
        // Assert the response body
        expect(response.body.message).toBe('Registered');
      });

    // Assert the register controller function was called
    expect(AuthController.register).toHaveBeenCalled();
  });
});
