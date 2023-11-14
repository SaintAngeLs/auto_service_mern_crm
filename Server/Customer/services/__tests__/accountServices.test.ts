/**
 * @file accountServices.test.ts
 * 
 * @description Tests for Account Service Routes
 * 
 */

import request from 'supertest';
import express from 'express';
import accountRouter from '../accountServices';
import * as AccountController from '../../controllers/accountController';
import * as checkAuth from '../../middlewares/check-auth';

// Mock the auth middleware to always authorize the user
jest.mock('../../middlewares/check-auth', () => ({
    checkAuth: {
      verifyToken: jest.fn((req, res, next) => next()),
      isCustomer: jest.fn((req, res, next) => next()),
    },
  }));

// Mock the Account Controller functions
jest.mock('../../controllers/accountController', () => ({
  getAllCustomers: jest.fn((req, res) => res.status(200).json({})),
  findCustById: jest.fn((req, res) => res.status(200).json({})),
  updateProfile: jest.fn((req, res) => res.status(200).json({})),
  deleteCustomer: jest.fn((req, res) => res.status(200).json({})),
}));

const app = express();
app.use(express.json());
app.use('/account', accountRouter);

describe('Account Services', () => {
  it('GET /account/findAll - success', async () => {
    const res = await request(app).get('/account/findAll');
    expect(res.statusCode).toBe(200);
    expect(AccountController.getAllCustomers).toHaveBeenCalled();
  });

  it('GET /account/findCustById/:custId - success', async () => {
    const custId = '123';
    const res = await request(app).get(`/account/findCustById/${custId}`);
    expect(res.statusCode).toBe(200);
    // Update the expected arguments to match the actual controller function signature
    expect(AccountController.findCustById).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function));
  });

  it('PATCH /account/updateProfile/:custId - success', async () => {
    const custId = '123';
    const res = await request(app)
      .patch(`/account/updateProfile/${custId}`)
      .send({ name: 'Updated Name' });
    expect(res.statusCode).toBe(200);
    // Update the expected arguments to match the actual controller function signature
    expect(AccountController.updateProfile).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function));
  });

  it('DELETE /account/deleteAccount/:custId - success', async () => {
    const custId = '123';
    const res = await request(app).delete(`/account/deleteAccount/${custId}`);
    expect(res.statusCode).toBe(200);
    // Update the expected arguments to match the actual controller function signature
    expect(AccountController.deleteCustomer).toHaveBeenCalledWith(expect.any(Object), expect.any(Object), expect.any(Function));
  });
});

