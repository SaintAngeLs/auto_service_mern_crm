# Car Service Mern stack App - V2 branch


## 🎯 About

MERN stack app.

- Created REST-APIs with NodeJS & Express.
- Created Front-End using React.
- Used MongoDB Atlas for database.
- Used JWT.
- There are 3 Roles customer, admin, service_manager  & .
- For more infomration is in the documentation of the project of each role. 

## Technologies Used 

- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Material-Table](https://material-table.com/#/)
- [react-hook-form](https://react-hook-form.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)


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


