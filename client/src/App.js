//**********************************************************************************/
//  Controlling the entire flow of the application.  Potential API routes include  */
//  search and saved which come from the Navigational bar component.  /books/:id   */
//  will come from clicking on a specific items wrapped within Books.              */
//**********************************************************************************/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Saved from "./pages/Saved";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/", "/search"]}>
            <Books />
          </Route>
          <Route exact path={"/saved"}>
            <Saved />
          </Route>
          {/* <Route exact path="/books/:id">
            <Detail />
          </Route> */}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;