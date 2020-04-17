//******************************************/
//  Manages all API routes for the server. */
//******************************************/
const router = require("express").Router();
const carRoutes = require("./carRoutes");
const loginRoute = require("./loginRoute");

// Car routes
router.use("/cars", carRoutes);
router.use("/login", loginRoute);
  
module.exports = router;
