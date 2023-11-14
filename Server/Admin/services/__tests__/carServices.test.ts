import request from 'supertest';
import express from 'express';
import carRouter from '../carServices'; 
import * as CarController from '../../controllers/carController';
import * as checkAuth from '../../middlewares/check-auth';

jest.setTimeout(10000); 

// Mock the middleware and controller methods
jest.mock('../../middlewares/check-auth', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  isAdmin: jest.fn((req, res, next) => next())
}));

jest.mock('../../controllers/carController', () => ({
    addCar: jest.fn().mockResolvedValue({ status: 201, message: 'Car Added Successfully' }),
    findAllCars: jest.fn(() => (req: any, res: any) => res.status(200).send([{ id: 'car1', brand: 'Brand' }])),
    // ...other mocks
  }));
  
// Create an express application and apply the car router
const app = express();
app.use(express.json());
app.use('/cars', carRouter);

describe('Car Services Routes', () => {
  it('should add a new car', async () => {
    // Define the body for the addCar route
    const carData = { brand: 'TestBrand', model: 'TestModel', year: 2020 };

    // Make POST request to add a new car
    const response  = await request(app)
      .post('/cars/addCar')
      .send(carData)

      expect(response.statusCode).toBe(201);
      expect(CarController.addCar).toHaveBeenCalled();
      
  }, 10000);

  it('should find all cars', async () => {
    await request(app)
      .get('/cars/findAll')
      .expect(200);

    expect(CarController.findAllCars).toHaveBeenCalled();
  });

  it('should find all car brands', async () => {
    await request(app)
      .get('/cars/findAllBrands')
      .expect(200);

    expect(CarController.findAllBrands).toHaveBeenCalled();
  });

  it('should find a car by brand', async () => {
    const brandData = { brand: 'TestBrand' };

    await request(app)
      .post('/cars/findByBrand')
      .send(brandData)
      .expect(200);

    expect(CarController.findByBrand).toHaveBeenCalled();
  });

  it('should find a car by ID', async () => {
    const carId = 'someCarId';

    await request(app)
      .get(`/cars/findByCar/${carId}`)
      .expect(200);

    expect(CarController.findByCarId).toHaveBeenCalled();
  });

  it('should update a car', async () => {
    const carId = 'someCarId';
    const updateData = { color: 'blue' };

    await request(app)
      .patch(`/cars/updateCar/${carId}`)
      .send(updateData)
      .expect(200);

    expect(CarController.updateCar).toHaveBeenCalled();
  });

  it('should delete a car', async () => {
    const carId = 'someCarId';

    await request(app)
      .delete(`/cars/deleteCar/${carId}`)
      .expect(200);

    expect(CarController.deleteCar).toHaveBeenCalled();
  });
});

// If you need to reset the mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
