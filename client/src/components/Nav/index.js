import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
    <div>
        <ul className="navbar-nav">
          <li className="nav-item menuItem">
              <NavLink
                to="/search"
                className="nav-link"
              >
                Search
              </NavLink>
          </li>
          <li className="nav-item">
              <NavLink
                to="/saved"
                className="nav-link menuItem"
              >
                Saved
              </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
