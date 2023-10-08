const mongoose = require("mongoose");

const memberModel = require("./model/memberModel");

const bcrypt = require("bcrypt");

const saltRounds = 10;

function createDefaultUsers() {
  // Array of default users
  const users = [
    { name: "Admin User", email: "admin@email.com", password: "admin3141592", role: "ADMIN" },
    { name: "Regular User", email: "user@email.com", password: "user3141592", role: "CUSTOMER" },
  ];

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
      console.log(`Default ${userObj.role} created: admin := { email:= admin@email.com ; password := admin3141592 } \n user := { email:= user@email.com ; password := user3141592 }`);
    });
  });
}

module.exports = { createDefaultUsers };


