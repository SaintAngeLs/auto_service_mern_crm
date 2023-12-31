import mongoose from 'mongoose';
import memberModel from './model/memberModel';
import bcrypt from 'bcrypt';

const saltRounds = 10;

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

/**
 * Function to create the default users to be populated in teh database  defined through the db connection string 
 * parsed correctly. Function handle the situation in the case the password hashing is not sucessfull
 * @return function has the type of the void: it populdates the database with the default users unly
 */
const createDefaultUsers = async () => {

  try {
    await memberModel.collection.createIndex({ email: 1 }, { unique: true });
    await memberModel.collection.createIndex({ role: 1, status: 1 });
    console.log('Indexes ensured on the member model.');
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error; // Stop the function if indexes cannot be created
  }

  // Array of default users
  const users: User[] = [
    { name: "Admin User", email: "admin@email.com", password: "admin3141592", role: "ADMIN" },
    { name: "Regular User", email: "user@email.com", password: "user3141592", role: "CUSTOMER" },
  ];

  // Iterate over each default user
  users.forEach((userObj) => {
    memberModel.findOne({ email: userObj.email }).then((user) => {
      if (!user) {
        // User does not exist, so create it
        bcrypt.hash(userObj.password, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            return;
          }
          
          const newUser = new memberModel({
            _id: new mongoose.Types.ObjectId(),
            name: userObj.name, 
            email: userObj.email,
            password: hash,
            role: userObj.role,
          });

          newUser.save().then(() => {
            console.log(`Default ${userObj.role} created ...`);
          });
        });
      }
      console.log(`Default ${userObj.role} created: \n admin.email:= admin@email.com \n admin.password := admin3141592  \n user := \n user.email := user@email.com \n user.password := user3141592 \n`);
    });
  });
};

export { createDefaultUsers };

