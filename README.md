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
    - [General](#controlers)
    - [Specification](#authentication-specification)
  - [Controlers](#controlers)
    - [Controlers General](#contololers-general)
    - [Controlers Specification](#constolers-specification)
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

Represents a car with properties:

- `name`: Name of the car (e.g., "Mustang").
- `brand`: Brand of the car (e.g., "Ford").

#### **customerModel.ts**

Represents a customer with properties:

- `name`: Name of the customer.
- `email`: Email of the customer, which must match an email regex.
- `password`: Password of the customer.
- `role`: The role of the user, defaulting to "CUSTOMER".

#### **userModel.ts**

Represents a user/member (likely a mechanic or an admin) with properties:

- `_id`: Unique identifier.
- `name`: Name of the user.
- `email`: Email of the user.
- `password`: Password of the user.
- `mobile`: Mobile number of the user.
- `role`: The role of the user, defaulting to "MECHANIC".
- `status`: The availability status of the mechanic, defaulting to "AVAILABLE".

#### **orderModel.ts**

Represents an order/service request with properties:

- `customerId`: ID of the customer making the order.
- `customerName`: Name of the customer.
- `carName`: Name of the car for which the service is requested.
- `carNumber`: Number plate of the car.
- `custAddress`: Address of the customer.
- `serviceName`: The type of service requested.
- `servicePrice`: The price of the requested service.
- `mechanicId`: ID of the mechanic assigned to the order.
- `requestedOn`: Date when the service was requested.
- `deliveredOn`: Date when the service was completed.
- `status`: Status of the order (e.g., "Pending", "Completed").

#### **serviceModel.ts**

Represents a service type with properties:

- `serviceType`: The type of the service (e.g., "Cleaning", "Repair").
- `name`: Name of the service.
- `price`: Price of the service.
- `description`: Description of the service.
- `timeRequired`: Time required to complete the service.
- `where`: Where the service is performed (e.g., "In-house", "At Customer Place").

### **API-endpoints**


The section below provides an overview of the various components and APIs in the backend of our application.

'Base URL:' http://localhost:8088/admin/auth/
### Login (POST)

- **Endpoint:** `/login`
- **Payload:** `{ email, password }`
- **Response:** Returns user data and a token. Stores user data to localStorage.

 Register Mechanic (POST)

- **Endpoint:** `/register`
- **Payload:** `{ name, email, password, mobile }`
- **Headers:** Authentication headers
- **Response:** Returns a message indicating registration status.

 Register (POST)

- **Endpoint:** `/register`
- **Payload:** `{ name, email, password }`
- **Response:** Initiates user registration.

#### Logout (Client-Side Functions)

Removes 'admin' from localStorage.

#### Logout Mechanic (Client-Side Functions)

Removes 'mechanic' from localStorage.

#### GetCurrentMechanic (Client-Side Functions)

Retrieves mechanic data from localStorage.

#### GetAdmin (Client-Side Functions)

Retrieves admin data from localStorage.

### Service Management (Package)

http://localhost:8010/admin/car-services/

### Get All Services (GET)

- **Endpoint:** `/findAll`
- **Response:** Returns a list of all services.

### Add Service (POST)

- **Endpoint:** `/addService`
- **Payload:** `{ serviceType, name, price, description, timeRequired, where }`
- **Headers:** Authentication headers
- **Response:** Returns a message indicating service addition status.

### Update Service (PATCH)

- **Endpoint:** `/updateService/:id`
- **Payload:** `{ id, serviceType, name, price, description, timeRequired, where }`
- **Headers:** Authentication headers
- **Response:** Returns a message indicating service update status.

### Delete Service (DELETE)

- **Endpoint:** `/deleteService/:id`
- **Headers:** Authentication headers
- **Response:** Returns deletion status.

### Find Service By ID (GET)

- **Endpoint:** `/findById/:id`
- **Response:** Returns service data by given ID.

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
  nvm use 16 && npm install && npm start
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
  npm install
```
- Start the server of all Microservices.

```bash
  npm start or node Server.js
```

- For the ADMIN access you need to insert a record mannually in the members database as a role ADMIN. 


### Docker section: it will be optimized later

To run the whole application with the Docker, run the next comand from the root directory of the project:
```bash
docker-compose up 
```
## Dev
- [x] admin microservice
- [ ] manager microservice
- [ ] customer microservice
- [ ] nice frontend-side implementing the api enpoints calls
