// Requiring our models and passport as we've configured it
const db = require("../../models");
const router = require("express").Router();
const passport = require("../../authentication/passport");
const isAuthenticated = require("../../authentication/isAuthenticated");

//***************************************************************************/
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
//***************************************************************************/

// router.route("/").post(passport.authenticate("local",{session:false}), function(req, res) {
  router.route("/").post(passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

//**********************************************/
// Route to ask if user has been autenticated  *
//**********************************************/
// router.route("/authenticated").get(isAuthenticated);


module.exports= router;
