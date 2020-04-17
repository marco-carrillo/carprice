// Requiring our models and passport as we've configured it
const db = require("../../models");
const router = require("express").Router();
const passport = require("../../config/passport");

//***************************************************************************/
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
//***************************************************************************/
console.log('I got here');
// app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   res.json(req.user);
// });

router.route("/").post(passport.authenticate("local",{session:false}), function(req, res) {
  res.json(req.user);
});


module.exports= router;
