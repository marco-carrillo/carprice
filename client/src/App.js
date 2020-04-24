//**********************************************************************************/
//  Controlling the entire flow of the application.  Potential API routes include  */
//  search and saved which come from the Navigational bar component.  /books/:id   */
//  will come from clicking on a specific items wrapped within Books.              */
//**********************************************************************************/
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NoMatch from "./components/nomatch";
import Navbar from "./components/navbar";
import Search from "./pages/search";
import Saved from "./pages/saved";
import Analysis from "./pages/analysis";
import SigninSide from "./pages/signin/SignInSide";
import UserAuthenticated from "./utils/UserAuthenticated";

function App() {
  const [userLogged, setUserLogged]= useState(false);

  useEffect(() => {
  }, []);

//********************************************************************/
//  The following function will change the user status within React  */
//********************************************************************/
  function handleLogin(outcome) {
    setUserLogged(outcome);
    console.log(`the outcome of the signin was ${outcome}`);
  }

//********************************************************************/
//  The following function will change the user status within React  */
//********************************************************************/
function handleLogout(event){
    event.preventDefault();
    setUserLogged(false);
  }

  return (
    <Router>
      <div>
        <Navbar logged={userLogged} callback={handleLogout}/>
        <Switch>
          {/* <Route exact path={"/"}>
              {!userLogged ? (<SigninSide callback={handleLogin}/>) : (<div/>)}
          </Route> */}
          <Route exact path={["/","/search"]}>
              {!userLogged ? (<SigninSide callback={handleLogin}/>) : (<Search />)}
          </Route>
          <Route exact path={"/saved"}>
              {!userLogged ? (<SigninSide callback={handleLogin}/>) : (<Saved />)}
          </Route>
          <Route exact path="/analysis">
              {!userLogged ? (<SigninSide callback={handleLogin}/>) : (<Analysis />)}
          </Route>
          <Route exact path="/logout">
              <Redirect to="/"/>
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