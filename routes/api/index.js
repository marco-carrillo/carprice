//******************************************/
//  Manages all API routes for the server. */
//******************************************/
const router = require("express").Router();
const carRoutes = require("./carRoutes");

// Car routes
router.use("/cars", carRoutes);
  
module.exports = router;
