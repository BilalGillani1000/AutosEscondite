import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding:"2% 3% 2% 5%"}}>
      <img src={require("../content/images/logo.jpg")} style={{width:"15%", borderRadius:"8px"}}/>

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
        <div className="collapse navbar-collapse container justify-content-center" id="navbarSupportedContent">
          <div className="grid-container">
            <SearchBar />
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{minWidth:"60px"}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{minWidth:"60px"}}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars/category/popular" style={{minWidth:"70px"}}>
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{minWidth:"60px"}}>
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{minWidth:"70px"}}>
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
