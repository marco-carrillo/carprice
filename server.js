//********************************************/
//  Installing all application dependencies  */
//********************************************/
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//************************************************************/
// Defining express to be able to modularize the application */
//************************************************************/
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

//*******************************************/
// Connecting to the Mongo DB via Mongoose  */
//*******************************************/
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

//********************************************/
// Start the API server to listen for calls  */
//********************************************/
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
