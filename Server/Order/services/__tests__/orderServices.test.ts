import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import orderRouter from '../orderServices'; // Adjust the import path as necessary
import * as OrderController from '../../controllers/ordersController';
import  checkAuth  from '../../middlewares/check-auth';

// Mock middlewares and controller methods
jest.mock('../../middlewares/check-auth', () => ({
    verifyToken: jest.fn((req, res, next) => next()),
}));

jest.mock('../../controllers/ordersController', () => ({
  addOrder: jest.fn((req, res) => res.status(201).send({ message: "Order added" })),
  findCompletedOrders: jest.fn((req, res) => res.status(200).send([])),
}));

// Create express application and apply the order router
const app = express();
app.use(bodyParser.json());
app.use('/orders', orderRouter);

describe('Order Services Routes', () => {
  it('should add an order', async () => {
    const orderData = { item: 'Sample Item', quantity: 1 }; // replace with your actual order data
    await request(app)
      .post('/orders/addOrder')
      .send(orderData)
      .expect(201);
    expect(OrderController.addOrder).toHaveBeenCalled();
  });

  it('should fetch all completed orders', async () => {
    await request(app)
      .get('/orders/findCompletedOrders')
      .expect(200);
    expect(OrderController.findCompletedOrders).toHaveBeenCalled();
  });

  // Reset the mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
