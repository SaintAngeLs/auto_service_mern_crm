import request from 'supertest';
import express from 'express';
import accountRouter from '../accountServices'; // Adjust the import path as necessary
import * as AccountController from '../../controllers/accountController';
import { checkAuth } from '../../middlewares/check-auth';

// Mock middlewares and controller methods
jest.mock('../../middlewares/check-auth', () => ({
    checkAuth: {
        verifyToken: jest.fn((req, res, next) => next()),
        isCustomer: jest.fn((req, res, next) => next()),
    }

}));
jest.mock('../../controllers/accountController', () => ({
  getAllCustomers: jest.fn((req, res) => res.status(200).send([])),
  findCustById: jest.fn((req, res) => res.status(200).send({})),
  updateProfile: jest.fn((req, res) => res.status(200).send({})),
  deleteCustomer: jest.fn((req, res) => res.status(204).send()),
}));

// Create express application and apply the account router
const app = express();
app.use(express.json());
app.use('/accounts', accountRouter);

describe('Account Services Routes', () => {
  it('should get all customers', async () => {
    await request(app)
      .get('/accounts/findAll')
      .expect(200);
    expect(AccountController.getAllCustomers).toHaveBeenCalled();
  });

  it('should find a customer by ID', async () => {
    const custId = 'someCustomerId';
    await request(app)
      .get(`/accounts/findCustById/${custId}`)
      .expect(200);
      expect(AccountController.findCustById).toHaveBeenCalledWith(
        expect.objectContaining({ params: { custId: 'someCustomerId' } }),
        expect.anything(),
        expect.anything()
      );
      
  },10000);

  it('should update customer profile', async () => {
    const custId = 'someCustomerId';
    const profileData = { name: 'Test' };
    await request(app)
      .patch(`/accounts/updateProfile/${custId}`)
      .send(profileData)
      .expect(200);
    expect(AccountController.updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ params: { custId: 'someCustomerId' } }),
        expect.anything(),
        expect.anything()
    );
  });

  it('should delete a customer account', async () => {
    const custId = 'someCustomerId';
    await request(app)
      .delete(`/accounts/deleteAccount/${custId}`)
      .expect(204);
    expect(AccountController.deleteCustomer).toHaveBeenCalledWith(
        expect.objectContaining({ params: { custId: 'someCustomerId' } }),
        expect.anything(),
        expect.anything()
    );
  });
});

// Reset the mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
