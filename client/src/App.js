//**********************************************************************************/
//  Controlling the entire flow of the application.  Potential API routes include  */
//  search and saved which come from the Navigational bar component.  /books/:id   */
//  will come from clicking on a specific items wrapped within Books.              */
//**********************************************************************************/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./components/nomatch";
import Navbar from "./components/navbar";
import Selling from "./pages/selling";

function App() {
  console.log(process.env.REACT_APP_MKTCHECK_APIKEY);
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={["/", "/selling"]}>
            <Selling />
          </Route>
          <Route exact path={"/buying"}>
          </Route>
          <Route exact path="/preferences">
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;