
import request from 'supertest';
import express from 'express';
import router from '../autoWashServices';
import * as checkAuth from '../../middlewares/check-auth';
import * as ServiceController from '../../controllers/serviceController';

// Create an express app instance and use the router
const app = express();
app.use(express.json());
app.use('/services', router);

// Mock middlewares and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  isAdmin: jest.fn((req, res, next) => next())
}));
jest.mock('../../controllers/serviceController', () => ({
  addService: jest.fn((req, res) => res.status(201).send()),
  findAll: jest.fn((req, res) => res.status(200).send()),
  findByServiceId: jest.fn((req, res) => res.status(200).send()),
  updateService: jest.fn((req, res) => res.status(200).send()),
  deleteService: jest.fn((req, res) => res.status(200).send())
}));

const mockedAddService = ServiceController.addService as jest.Mock;
const mockedFindAll = ServiceController.findAll as jest.Mock;
const mockedFindByServiceId = ServiceController.findByServiceId as jest.Mock;
const mockedUpdateService = ServiceController.updateService as jest.Mock;
const mockedDeleteService = ServiceController.deleteService as jest.Mock;


describe('Auto Wash Services Routes', () => {
  it('should call addService controller for POST /addService', async () => {
    await request(app).post('/services/addService').expect(201);
    expect(ServiceController.addService).toHaveBeenCalled();
  });

  it('should call findAll controller for GET /findAll', async () => {
    await request(app).get('/services/findAll').expect(200);
    expect(ServiceController.findAll).toHaveBeenCalled();
  });

  it('should call findByServiceId controller for GET /findById/:serviceId', async () => {
    const serviceId = 'someServiceId';
    await request(app).get(`/services/findById/${serviceId}`).expect(200);
     // Check if the mock function was called
     expect(mockedFindByServiceId).toHaveBeenCalled();
    
     // Access the first call to the mock function and the first argument (req)
     const mockReq = mockedFindByServiceId.mock.calls[0][0];
     
     // Assert that req.params.serviceId is the same as the serviceId used in the URL
     expect(mockReq.params.serviceId).toBe(serviceId);
  });

  it('should call updateService controller for PATCH /updateService/:serviceId', async () => {
    const serviceId = 'someServiceId';
    await request(app).patch(`/services/updateService/${serviceId}`).expect(200);
    expect(ServiceController.updateService).toHaveBeenCalled();
  });

  it('should call deleteService controller for DELETE /deleteService/:serviceId', async () => {
    const serviceId = 'someServiceId';
    await request(app).delete(`/services/deleteService/${serviceId}`).expect(200);
    expect(ServiceController.deleteService).toHaveBeenCalled();
  });
});
