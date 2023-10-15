# Car Service App - V2 branch


## 🎯 About
- Created REST-APIs with NodeJS & Express.
- Created Front-End using React.
- Used MongoDB Atlas for database.
- Used JWT.
- There are 3 Roles customer, admin, service_manager  & .
- For more infomration is in the documentation of the project of each role. 

## Technologies Stack Used 

- [React](https://reactjs.org/)
- [TypeScript](https://https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken#readme)


# Documentation

## Table of Contents

- [Introduction](#introduction)
- [Backend Components and API end points](#features)
  - [App.ts (Main Express App Configuration)](#appts-main-express-app-configuration)
  - [Authentication and Authorization Middlewares](#check-authts-authentication-and-authorization-middlewares)
  - [Models](#models)
    - [carModel.ts](#carmodelts)
    - [customerModel.ts](#customermodelts)
    - [userModel.ts](#usermodelts)
    - [orderModel.ts](#ordermodelts)
    - [serviceModel.ts](#servicemodelts)
  - [API-endpoints](#api-endpoints)
- [Summary](#summary)

## Introduction

Provide a brief introduction to your project. Explain what it does and its purpose.

## Features

List the key features of your project:

### **App.ts (Main Express App Configuration)**

This file sets up the Express application and incorporates the required middleware for request processing, database connection, CORS, and routing.

#### **Database Connection**

It connects to MongoDB using mongoose and provides error handling for connection errors.

#### **Middlewares**

- `bodyParser`: Parses incoming request bodies.
- Custom middleware for CORS errors.
- Routing for different services like authentication, cars, services, orders, and mechanics.
- Error handling for 404 and general errors.

### **check-auth.ts (Authentication and Authorization Middlewares)**

This file contains middleware for verifying JWT tokens and checking if a user has an ADMIN role.

#### **verifyToken**

Extracts the token from the headers and verifies it. If valid, the user ID is attached to the request object.

#### **isAdmin**

Checks if the authenticated user has the ADMIN role.

### **Controlers**



### **Models**

These are mongoose models that represent the data structures in MongoDB. They define the schema and the types for each collection in the database.

#### **carModel.ts**

| Property | Description               |
| -------- | ------------------------- |
| `name`   | Name of the car           |
| `brand`  | Brand of the car          |

#### **customerModel.ts**

| Property   | Description                     |
| ---------- | ------------------------------- |
| `name`     | Name of the customer             |
| `email`    | Email of the customer (must match an email regex) |
| `password` | Password of the customer         |
| `role`     | The role of the user (defaulting to "CUSTOMER") |

#### **userModel.ts**

| Property    | Description                     |
| ----------- | ------------------------------- |
| `_id`       | Unique identifier               |
| `name`      | Name of the user                 |
| `email`     | Email of the user                |
| `password`  | Password of the user             |
| `mobile`    | Mobile number of the user        |
| `role`      | The role of the user (defaulting to "MECHANIC") |
| `status`    | The availability status of the mechanic (defaulting to "AVAILABLE") |

#### **orderModel.ts**

| Property         | Description                     |
| ---------------- | ------------------------------- |
| `customerId`     | ID of the customer making the order |
| `customerName`   | Name of the customer             |
| `carName`        | Name of the car for which the service is requested |
| `carNumber`      | Number plate of the car         |
| `custAddress`    | Address of the customer         |
| `serviceName`    | The type of service requested   |
| `servicePrice`   | The price of the requested service |
| `mechanicId`     | ID of the mechanic assigned to the order |
| `requestedOn`    | Date when the service was requested |
| `deliveredOn`    | Date when the service was completed |
| `status`         | Status of the order (e.g., "Pending", "Completed") |

#### **serviceModel.ts**

| Property      | Description                     |
| ------------- | ------------------------------- |
| `serviceType` | The type of the service (e.g., "Cleaning", "Repair") |
| `name`        | Name of the service             |
| `price`       | Price of the service            |
| `description` | Description of the service      |
| `timeRequired`| Time required to complete the service |
| `where`       | Where the service is performed (e.g., "In-house", "At Customer Place") |

#### **customerModel.ts**

| Property   | Description                     |
| ---------- | ------------------------------- |
| `name`     | Name of the customer             |
| `email`    | Email of the customer (must match an email regex) |
| `password` | Password of the customer         |
| `role`     | The role of the user (defaulting to "CUSTOMER") |


####

### **API-endpoints**


The section below provides an overview of the various components and APIs in the backend of our application.


### Login (POST)
Login as a memeber, login as a memeber and logint as a user respectively

>General

'Base URL:' http://localhost:8088/admin/auth/

- **Endpoint:** `/login`
- **Payload:** `{ email, password }`
- **Response:** Returns user data and a token. Stores user data to localStorage.

 Register Mechanic (POST)

- **Endpoint:** `/register`
- **Payload:** `{ name, email, password, mobile }`
- **Response:** Returns a message indicating registration status.

 Register (POST)

- **Endpoint:** `/register`
- **Payload:** `{ name, email, password }`
- **Response:** Initiates user registration.

> Specific cases of usage
#### ADMIN login:
```json
Login
{
  role: 'ADMIN',
  _id: 651f30fb21f4ce7d8c0cd0d4,
  name: 'Admin',
  email: 'admin@email.com',
  password: '$2b$10$TN/Fs6vdx49NVUhY47BdIOJ.mw/r6FKWU56ptbcHcu77pQER/p2G2',
  __v: 0
}
```
#### MECHANIC login
```json
Login
{
  role: 'CUSTOMER',
  _id: 651f30fc21f4ce7d8c0cd0d5,
  name: 'Mechanic',
  email: 'user@email.com',
  password: '$2b$10$1t/PNFHPjJdlgjRsCmAgkO1dTI4vu/rdmljRAuW1OO34SzURwLxIq',
  __v: 0
}
```


#### User register:
```json
Register
{
  role: 'CUSTOMER',
  _id: 652420ad5f3999bba98b1311,
  name: 'Customer',
  email: 'customer@email.com',
  password: '$2b$10$JT0R9mvnp/28IAb5hRzxe.ooaxrn2gbjpKXO1Awk5IjdYIR519dqq',
  __v: 0
}
```



### Customer-services:

> General

The base URL for all customer-related operations is: `http://localhost:8080/customer/`

### Place Order (POST)

- **Endpoint:** `/placeOrder`
- **Payload:** `{ customerId, customerName, carName, carNumber, custAddress, serviceName, servicePrice }`
- **Description:** Places an order for a customer and returns a message indicating the order status.

### Find Customer Orders (GET)

- **Endpoint:** `/findOrders/:id`
- **Description:** Fetches orders placed by a specific customer based on their ID.

### Find Customer By ID (GET)

- **Endpoint:** `/account/findCustById/:id`
- **Description:** Retrieves customer information based on the customer's ID.

> Specific Cases of Usage

#### Placing an Order

To place an order, make a POST request to the following endpoint:

**Endpoint:** `http://localhost:8080/customer/placeOrder`
```json
  {
    "customerId": "123456",
    "customerName": "John Doe",
    "carName": "Car1",
    "carNumber": "123ABC",
    "custAddress": "123 Main St",
    "serviceName": "Service1",
    "servicePrice": 50.00
  }
```

### Car Management

> General:

The main endpoint for car services is: `http://localhost:8088/admin/car-func/`

#### Get All Car Brands (GET)

- **Endpoint:** `/findAllBrands`
- **Description:** Returns a list of all car brands.

#### Get Cars By Brand (POST)

- **Endpoint:** `/findByBrand`
- **Payload:** `{ brand }`
- **Description:** Returns a list of cars by the given brand.

#### Get All Cars (GET)

- **Endpoint:** `/findAll`
- **Description:** Returns a list of all cars.

#### Add Car (POST)

- **Endpoint:** `/addCar`
- **Payload:** `{ name, brand }`
- **Description:** Returns a message indicating car addition status.

#### Update Car (PATCH)

- **Endpoint:** `/updateCar/:carId`
- **Payload:** `{ brand }`
- **Description:** Returns a message indicating car update status.

#### Delete Car (DELETE)

- **Endpoint:** `/deleteCar/:carId`
- **Description:** Returns deletion status.

#### Find Car By ID (GET)

- **Endpoint:** `/findByCar/:carId`
- **Description:** Returns car data by given ID.



> Specific cases of usage:


Main end-point: http://localhost:8088/admin/car-func/

Adding the car: http://localhost:8088/admin/car-func/addCar

```json
Car Added: {
  name: 'Car1',
  brand: 'cAR1',
  _id: new ObjectId("652485e5defcb11e9b8da963"),
  __v: 0
}
```

Updating the car: http://localhost:8088/admin/car-func/addCar/updateCar/${carId_car_to_update}


```json
Updated Successfully
Car Added: {
  name: '1Car1',
  brand: '1cAR1',
  _id: new ObjectId("652485e5defcb11e9b8da963"),
  __v: 0
}

```


### Service Management (Package)

> General

http://localhost:8010/admin/car-services/

#### Get All Services (GET)

- **Endpoint:** `/findAll`
- **Response:** Returns a list of all services.

#### Add Service (POST)

- **Endpoint:** `/addService`
- **Payload:** `{ serviceType, name, price, description, timeRequired, where }`
- **Response:** Returns a message indicating service addition status.

#### Update Service (PATCH)

- **Endpoint:** `/updateService/:id`
- **Payload:** `{ id, serviceType, name, price, description, timeRequired, where }`
- **Response:** Returns a message indicating service update status.

#### Delete Service (DELETE)

- **Endpoint:** `/deleteService/:id`
- **Response:** Returns deletion status.

#### Find Service By ID (GET)

- **Endpoint:** `/findById/:id`
- **Response:** Returns service data by given ID.

> Specific Cases

#### Get All Services

To retrieve a list of all available services, make a GET request to the following endpoint:

**Endpoint:** `/findAll`


Response Example (Click to expand)

```json
  {
    "id": "1",
    "serviceType": "Basic Maintenance",
    "name": "Service A",
    "price": 50.00,
    "description": "Basic maintenance for your car.",
    "timeRequired": "1 hour",
    "where": "In-shop"
  },
  {
    "id": "2",
    "serviceType": "Advanced Repair",
    "name": "Service B",
    "price": 100.00,
    "description": "Advanced repair for your car.",
    "timeRequired": "2 hours",
    "where": "On-site"
  }
```

#### Add Service
To add a new service, make a POST request to the following endpoint:

Endpoint: '/addService'

```json
{
  "serviceType": "Basic Maintenance",
  "name": "Service C",
  "price": 60.00,
  "description": "Basic maintenance for your car.",
  "timeRequired": "1 hour",
  "where": "In-shop"
}
```

Response: Service Added Successfully

#### Update Service

To update an existing service, make a PATCH request to the following endpoint by replacing :id with the actual service ID:

Endpoint: '/updateService/:id'
```json
{
  "id": "1",
  "serviceType": "Basic Maintenance",
  "name": "Updated Service A",
  "price": 55.00,
  "description": "Updated basic maintenance for your car.",
  "timeRequired": "1 hour",
  "where": "In-shop"
}

```
Response: Service Updated Successfully

#### Delete Service

To delete a service, make a DELETE request to the following endpoint by replacing :id with the actual service ID:

Endpoint: /deleteService/:id

Response: Service Deleted Successfully

#### Find Service 

To find a service by its ID, make a GET request to the following endpoint by replacing :id with the actual service ID:

Endpoint: '/findById/:id'

```json
{
  "id": "1",
  "serviceType": "Basic Maintenance",
  "name": "Updated Service A",
  "price": 55.00,
  "description": "Updated basic maintenance for your car.",
  "timeRequired": "1 hour",
  "where": "In-shop"
}

```

#### Admin Orders

> General



> Specific cases

To retrieve a list of all placed orders, make a GET request to the following endpoint:

Admin Orders Endpoint: http://localhost:8010/admin/order/findPlacedOrder

```json
  {
    "orderId": "1",
    "customerId": "12345",
    "mechanicId": null,
    "orderStatus": "Placed",
    "createdAt": "2023-10-10T12:00:00Z"
  },
  {
    "orderId": "2",
    "customerId": "54321",
    "mechanicId": null,
    "orderStatus": "Placed",
    "createdAt": "2023-10-11T14:30:00Z"
  }

```

#### Assign Order to Mechanic
To assign an order to a mechanic, make a PATCH request to the following endpoint:

Endpoint: 'http://localhost:8010/admin/order/updateOrder/:orderId'

```json
{
  "mechanicId": "exampleMechanicId"
}

```

Response:

```json
{
  "message": "Order assigned to mechanic successfully."
}


```

#### Get Completed Orders

To retrieve a list of all completed orders, make a GET request to the following endpoint:

Endpoint: 'http://localhost:8030/order/findCompletedOrders'

Response:
```json
{
    "orderId": "3",
    "customerId": "67890",
    "mechanicId": "mechanic314",
    "orderStatus": "Completed",
    "completedAt": "2023-10-12T15:45:00Z"
  },
  {
    "orderId": "4",
    "customerId": "98765",
    "mechanicId": "mechanic314",
    "orderStatus": "Completed",
    "completedAt": "2023-10-13T10:15:00Z"
  }

```

## **Summary**

Provide a summary of your project and its purpose. You can also include installation instructions, usage examples, and any other relevant information here.


SERVICES FOR EACH ROLE

CUSTOMERS:

1. Sign-Up/Login
2. Choose a CAR from Car Categories/ Enter Car Details: Enter car details like make, model name, year, color and other details to pick the right car wash service.
3. Custom Pricing: The feature lets users choose plans from deluxe or premium car wash services as per their car & range.
4. Add-ons Services: Besides the fixed package services, customers can avail additional services by adding them from Add-ons services, if they want.
5. Payment Summary: Users can get immediate payment summary for the services received.
6. Book-A-Wash
7. Wash Status: Get the update of car’s wash status: done, in progress or in queue.
8. My Washes: Users can view the timeline of all car washes that they have carried out

Mechanics: 

1. Login
2. Wash Request: Wash Request is sent to the washer along with the user details. The washer can either accept or decline the request..
3. Profile: Washers can view and update their profile information.
4. My Orders: Washers can also view their past and current orders

ADMIN: 

1. Washer Management: Add/Edit Washer Details
2. Car Management: Add/Edit Car Details
3. Service Plan Management: Add/Edit Plans and Service Add-ons
4. Order Management: View Order Details and assign pending requests to washers
5. Report Management: Admin can generate and filter reports based on orders, washers, dates



## Run Locally

- To clone the Project

```bash
  git clone  ... the repo ...
```
- Go to Client directory to run the frontend

```bash
  cd Client/automitive_service_app
```
- To Run the frontend
```bash
  nvm use 18 && npm install && npm start
```

## Auth:
admin: admin@email.com  admin3141592   |  test@email.com    test3141592   |    

### For Back-End

#### Configure your Database with NodeJs

- Go to the Back-End project directory

```bash
  cd Server
```
- There are 4 Microservices
- Inside each Microservice a dbConfig.js file is there in config folder. Inside that you have to provide your database credentials.
- Install dependencies for each Microservice (Admin, Customer, Mechaninc, Order).

```bash
  cd Admin
```

```bash
nvm use 18 && npm install
```
- Start the server of all Microservices.

```bash
  node Server.js # or the next like is far more comfortable for the specific reason 
  npm start
```

- For the ADMIN access you need to insert a record mannually in the members database as a role ADMIN. 

## USer login

ADMIN user_name: admin@email.com
ADMIN password: admin3141592

MECHANIC user_name: user@email.com
MECHANIC password: user3141592

CUSTOMER user_name: test@email.com
CUSTOMER password: test3141592

### Docker section: it will be optimized later

To run the whole application with the Docker, run the next comand from the root directory of the project:
```bash
docker-compose up 
```
## Dev plan(for developers)
- [x] admin microservice
- [x] manager microservice
- [x] customer microservice
- [x] order microservice
- [ ] nice frontend-side implementing the api enpoints calls
- [x] migrating to git
- [x] migrating services to git
- [x] updating js to ts in the Server-side
- [ ] check the auth headers in the client
- [ ] frontend update
- [ ] updating the docker-compose 
- [ ] adding the tests
- [ ] Do not use the 'jsonwebtoken' 
  - [ ] craft own JWT
  - [ ] Use the JSON.Parse && JSON.Stringify implemented in the 'tasks/task13/task' fomm the  'node_laba_course' repository
