//**********************************************************/
//  Getting the Mongoose models for the collection table   */
//**********************************************************/
const db = require("../models");
const axios = require("axios");
require('dotenv').config();

//********************************************/
// Defining methods for the booksController  */
//********************************************/
module.exports = {

  findAll: function(req, res) {
  
    db.Car
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //*****************************************************/
  //  Finds a document based on the ID of such document */
  //*****************************************************/
  findById: function(req, res) {
    db.Car
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //**************************************************/
  //  Creates a document using the parameters passed */
  //**************************************************/
  create: function(req, res) {
    db.Car
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //*********************************************************************************/
  //  Updates a document in the collection using the ID, and the information passed */
  //*********************************************************************************/
  update: function(req, res) {
    db.Car
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //******************************************/
  //  Deletes a document using the ID passed */
  //******************************************/
  remove: function(req, res) {
    db.Car
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};