//**********************************************************************************************/
//  This file will manage the "cars" API route.  Will serve two routes, one that will serve    */
//  all cars stored in Mongoose collection and the other finds a specific car                  */ 
//**********************************************************************************************/
const router = require("express").Router();
const carsController = require("../../controllers/carsController");

// router.route("/google")
  // .get(carsController.getGoogleBooks);

//**********************************************************************************/
// Serves two routes "/api/cars".  If HTTP GET, gets all cars in the collection.  */
// If HTTP POST then creates a new document in the Mongoose collection.            */
//**********************************************************************************/
router.route("/")
  .get(carsController.findAll)
  .post(carsController.create);

//*************************************************************************************/
// Serves two route "/api/cars:id".  If HTTP GET, gets a specific car based on ID.    */
// If HTTP GET, then updates a car in the collection.  Finnally, if HTTP DELETE       */
// then deletes a car from the Mongoose collection.                                   */
//*************************************************************************************/
router
  .route("/:id")
  .get(carsController.findById)
  .put(carsController.update)
  .delete(carsController.remove);


module.exports = router;
