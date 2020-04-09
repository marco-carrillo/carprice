//**********************************************************************************/
//  Controlling the entire flow of the application.  Potential API routes include  */
//  search and saved which come from the Navigational bar component.  /books/:id   */
//  will come from clicking on a specific items wrapped within Books.              */
//**********************************************************************************/
import React from "react";
// import Button from "@material-ui/core/Button";
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInSide from './components/SignInSide'

function App() {
  return (

    <SignInSide />

  );
}

export default App;