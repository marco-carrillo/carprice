//**********************************************************************************/
//  Controlling the entire flow of the application.  Potential API routes include  */
//  search and saved which come from the Navigational bar component.  /books/:id   */
//  will come from clicking on a specific items wrapped within Books.              */
//**********************************************************************************/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./components/nomatch";
import Navbar from "./components/navbar";
import Search from "./pages/search";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={["/", "/search"]}>
            <Search />
          </Route>
          <Route exact path={"/saved"}>
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