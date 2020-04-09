//**********************************************************************************************/
//  This file will manage the "books" API route.  Will serve two routes, one that will serve   */
//  all books stored in Mongoose collection and the other finds a specific book                */ 
//**********************************************************************************************/
const router = require("express").Router();
const booksController = require("../../controllers/booksController");

router
  .route("/google")
  .get(booksController.getGoogleBooks);

//**********************************************************************************/
// Serves two route "/api/books".  If HTTP GET, gets all books in the collection.  */
// If HTTP POST then creates a new document in the Mongoose collection.            */
//**********************************************************************************/
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

//*************************************************************************************/
// Serves two route "/api/books:id".  If HTTP GET, gets a specific book based on ID.  */
// If HTTP GET, then updates a book in the collection.  Finnally, if HTTP DELETE      */
// then deletes a books from the Mongoose collection.                                 */
//*************************************************************************************/
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
