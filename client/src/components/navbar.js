//***************************************************************************/
//  This component will provide the distinct options available to the user  */
//***************************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.style.css";
import Logo from '../pictures/MClogo.png';

function Navbar() {
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
                Car prices
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/analysis"
                className="nav-link menuItem"
              >
                Delivered car prices
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;