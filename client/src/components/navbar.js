//***************************************************************************/
//  This component will provide the distinct options available to the user  */
//***************************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.style.css";
import Logo from '../pictures/MClogo.png';
import { PromiseProvider } from "mongoose";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg xnavbar-light xbg-light menu">
    {/* <NavLink className="navbar-brand" to="/"> */}
        <img src={Logo} className="logo" />
    {/* </NavLink> */}

    <div>
        <ul className="navbar-nav">
          <li className="nav-item">
              <NavLink
                to="/search"
                className="nav-link menuItem"
              >
                Search Car with VIN
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
                to="/analysis"
                className="nav-link menuItem"
              >
                Download search data
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/logout"
                className="nav-link menuItem"
              >
                {props.logged ? 
                  (<button type="button" className="btn btn-danger" onClick={props.callback}>
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