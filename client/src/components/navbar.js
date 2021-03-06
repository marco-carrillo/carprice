//***************************************************************************/
//  This component will provide the distinct options available to the user  */
//***************************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.style.css";
import Logo from '../pictures/MClogo.png';
// import { PromiseProvider } from "mongoose";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg xnavbar-light xbg-light menu">
        <img src={Logo} className="logo" />

    <div>
        <ul className="navbar-nav">
          <li className="nav-item">
              <NavLink
                to="/search"
                className="nav-link menuItem"
              >
                Search Car
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/saved"
                className="nav-link menuItem"
              >
                Saved cars
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/logout"
                className="nav-link menuItem"
              >
                {props.logged ? 
                  (<button type="button" className="btn event_btnm my-0 py-2" onClick={props.callback}>
                      Logout
                  </button>) : (<div/>)
                }
                
              </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;