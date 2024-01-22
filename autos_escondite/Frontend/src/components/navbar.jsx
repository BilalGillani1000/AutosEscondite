import React from "react";

const Navbar=()=>{
    return(
        <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/" >AutosEscondite</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/use-cases">Use Cases</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pricing">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/social-impacts">Social Impacts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    );
}
export default Navbar;