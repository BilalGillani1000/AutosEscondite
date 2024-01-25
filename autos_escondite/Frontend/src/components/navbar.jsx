import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";

const Navbar = () => {
  return (
    <div style={{padding:"2% 2% 2% 4% ", border:"1px solid black"}}>
      <nav className="navbar navbar-expand-lg navbar-light">
      <div className="navbar-brand">AutosEscondite</div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="grid-container">
            <SearchBar />
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
