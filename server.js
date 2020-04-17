//********************************************/
//  Installing all application dependencies  */
//********************************************/
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
require('dotenv').config();

//************************************************************/
// Defining express to be able to modularize the application */
//************************************************************/
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//******************************************************/
// Managing API and static routes for the application  */
//******************************************************/
app.use(routes);

//*******************************************************************/
// We need to use sessions to keep track of our user's login status */
//*******************************************************************/
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//*******************************************/
// Connecting to the Mongo DB via Mongoose  */
//*******************************************/
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/VINCarPrices");

//********************************************/
// Start the API server to listen for calls  */
//********************************************/
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
