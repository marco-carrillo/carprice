//***********************************/
//  Define the Book Mongoose model  */
//***********************************/
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
