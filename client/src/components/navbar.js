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
          <li className="nav-item">
              <NavLink
                to="/search"
                className="nav-link menuItem"
              >
                Search for Car
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
          <li className="nav-item menuItem">
              <NavLink
                to="/preferences"
                className="nav-link"
              >
                Financial cost
              </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;