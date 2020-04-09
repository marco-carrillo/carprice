//******************************************************************************************/
//  This file will manage the call to the google API.  In a way, it is an API that         */
//  makes an API call.  The reason for doing so in the server rather than directly from    */
//  the browser is not to expose the API key.                                              */
//******************************************************************************************/
const router = require("express").Router();
const axios = require("axios");

//********************************************************/
//  Getting Google API keys as an enviromental variable  */
//********************************************************/
require('dotenv').config();
api_key=process.env.API_KEY;
let apiQuery=`https://www.googleapis.com/books/v1/volumes?q="${formObject.bookname}"&key=${apiKey}&maxResults=40`;


//***********************************************/
// Serves a single route GET "/api/googleAPI".  */
//***********************************************/
router.route("/").get({

  axios.get('https://api.github.com/users/mapbox')
  .then((response) => {
    console.log(response.data);
  });  


})

axios.get('https://api.github.com/users/mapbox')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });

  module.exports = router;