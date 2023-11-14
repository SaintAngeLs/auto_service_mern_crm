import request from 'supertest';
import express from 'express';
import accountRouter from '../accountServices'; // Update with the correct import path
import * as AccountController from '../../controllers/accountController';
import checkAuth from '../../middlewares/check-auth';

// Mock the middleware and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
}));
jest.mock('../../controllers/accountController', () => ({
  updateProfile: jest.fn((req, res) => res.status(200).json({ message: 'Profile updated' })),
  deleteProfile: jest.fn((req, res) => res.status(200).json({ message: 'Profile deleted' })),
}));

const app = express();
app.use(express.json());
app.use('/account', accountRouter);

describe('Account Services Routes', () => {
  it('should update the profile of a manager', async () => {
    const managerId = 'someManagerId';
    const profileData = { name: 'Test Name' };
    const res = await request(app)
      .patch(`/account/update/${managerId}`)
      .send(profileData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Profile updated');
    expect(AccountController.updateProfile).toHaveBeenCalled();
    expect(checkAuth.verifyToken).toHaveBeenCalled();
  }, 10000);

  it('should delete the profile of a manager', async () => {
    const managerId = 'someManagerId';

    const res = await request(app)
    .delete(`/account/delete/${managerId}`)
    .expect(200); 
  
    expect(res.statusCode).toBe(200);
  
  });
  
});

afterEach(() => {
  jest.clearAllMocks();
});
