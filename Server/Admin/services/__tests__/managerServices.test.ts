import request from 'supertest';
import express from 'express';
import router from '../managerServices'; // Update the import path according to your project structure
import * as ManagerController from '../../controllers/managerController';
import * as checkAuth from '../../middlewares/check-auth';

// Mock the middleware and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  isAdmin: jest.fn((req, res, next) => next())
}));

jest.mock('../../controllers/managerController', () => ({
  findAvailable: jest.fn((req, res) => res.status(200).send({ message: 'Available managers' })),
  findAll: jest.fn((req, res) => res.status(200).send({ message: 'All managers' }))
}));

// Create an express application and apply the router
const app = express();
app.use(express.json());
app.use('/managers', router);

describe('Manager Services Routes', () => {
  it('should handle finding available managers', async () => {
    const response = await request(app)
      .get('/managers/findAvailable')
      .expect(200);

    expect(response.body.message).toBe('Available managers');
    expect(ManagerController.findAvailable).toHaveBeenCalled();
  });

  it('should handle finding all managers', async () => {
    const response = await request(app)
      .get('/managers/findAll')
      .expect(200);

    expect(response.body.message).toBe('All managers');
    expect(ManagerController.findAll).toHaveBeenCalled();
  });
});
