//******************************************/
//  Manages all API routes for the server. */
//******************************************/
const router = require("express").Router();
const bookRoutes = require("./books");
// const googleAPI=require("./googleAPI");

// Book routes
router.use("/books", bookRoutes);
// router.use("/googleAPI",googleAPI)

module.exports = router;
