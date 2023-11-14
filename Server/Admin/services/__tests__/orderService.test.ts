import request from 'supertest';
import express from 'express';
import router from '../orderServices'; 
import * as OrderController from '../../controllers/orderController';
import * as checkAuth from '../../middlewares/check-auth';

// Mock the middleware and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  isAdmin: jest.fn((req, res, next) => next())
}));

jest.mock('../../controllers/orderController', () => ({
  findPlacedOrders: jest.fn((req, res) => res.status(200).send({ message: 'Found placed orders' })),
  updateOrder: jest.fn((req, res) => res.status(200).send({ message: 'Order updated' }))
}));

// Create an express application and apply the router
const app = express();
app.use(express.json());
app.use('/orders', router);

describe('Order Services Routes', () => {
  it('should handle finding placed orders', async () => {
    const response = await request(app)
      .get('/orders/findPlacedOrder')
      .expect(200);

    expect(response.body.message).toBe('Found placed orders');
    expect(OrderController.findPlacedOrders).toHaveBeenCalled();
  });

  it('should handle updating an order', async () => {
    const orderId = 'someOrderId';
    const updateData = { status: 'completed' };

    const response = await request(app)
      .patch(`/orders/updateOrder/${orderId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.message).toBe('Order updated');
    expect(OrderController.updateOrder).toHaveBeenCalled();
  });
});
