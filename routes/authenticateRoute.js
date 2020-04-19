// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

//************************************************************************/
// Requiring our custom middleware for checking if a user is logged in
// All restricted routes will be checked against this route
//************************************************************************/
var isAuthenticated = require("../authentication/isAuthenticated");

module.exports = function(app) {
  
  //******************************************************************************/
  // From now on, all of those are restricted routes.  This is where we call
  // the authentication middleware to ensure the user has been logged
  // the following are all of the manager's html routes
  //******************************************************************************/
  app.get("/authenticated", function(req, res) {
    if (req.user){
      console.log("user is ok");
      res.json(true);
    } else {
      console.log("user is NOT ok");
      res.json(false);
    }

  });
};
