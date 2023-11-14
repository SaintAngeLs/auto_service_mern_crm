import request from 'supertest';
import express from 'express';
import orderRouter from '../orderServices';
import * as OrderController from '../../controllers/orderController';
import checkAuth from '../../middlewares/check-auth';

// Mock middlewares and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  isManager: jest.fn((req, res, next) => next()),
}));
jest.mock('../../controllers/orderController', () => ({
  updateOrder: jest.fn((req, res) => res.status(200).json({ message: 'Order updated' })),
  findInProcessOrders: jest.fn((req, res) => res.status(200).json({ orders: [] })),
  findMyOrders: jest.fn((req, res) => res.status(200).json({ orders: [] })),
}));

const app = express();
app.use(express.json());
app.use('/orders', orderRouter);

describe('Order Services Routes', () => {
  it('should update an order', async () => {
    const orderId = 'someOrderId';
    const updateData = { status: 'In Process' };
    const res = await request(app)
      .patch(`/orders/updateOrder/${orderId}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Order updated');
    expect(OrderController.updateOrder).toHaveBeenCalled();
    expect(checkAuth.verifyToken).toHaveBeenCalled();
    expect(checkAuth.isManager).toHaveBeenCalled();
  });

  it('should find in-process orders for a manager', async () => {
    const managerId = 'someManagerId';
    const res = await request(app)
      .get(`/orders/findInProcessOrders/${managerId}`);
    expect(res.statusCode).toBe(200);

  });
  
  it('should find orders for a manager', async () => {
    const managerId = 'someManagerId';
    const res = await request(app)
      .get(`/orders/findMyOrders/${managerId}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('orders');
    expect(res.statusCode).toBe(200);
  });
  
});

afterEach(() => {
  jest.clearAllMocks();
});
