//***************************************************************************/
//  This component will provide the distinct options available to the user  */
//***************************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.style.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
    <div>
        <ul className="navbar-nav">
          <li className="nav-item menuItem">
              <NavLink
                to="/preferences"
                className="nav-link"
              >
                User Preferences
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/selling"
                className="nav-link menuItem"
              >
                Selling a Car
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/buying"
                className="nav-link menuItem"
              >
                Buying a Car
              </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;