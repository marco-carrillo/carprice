//**************************************************************************/
//  Managing routes, static routes redirected to React, API to API routes  */
//**************************************************************************/
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

//*******************************************************/
// Server API Routes are defined within the folder API  */
//*******************************************************/
router.use("/api", apiRoutes);

//*****************************************************************/
// All non-API routes (static and not) are send to the React app  */
//*****************************************************************/
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
