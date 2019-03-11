import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  let match = window.location.pathname;
  return (
    // <nav className="navbar navbar-dark">
    //     <div className="container">
    //         <div className="navbar-header">
    //             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    //                 <span className="sr-only">Toggle navigation</span>
    //                 <span className="icon-bar"></span>
    //                 <span className="icon-bar"></span>
    //                 <span className="icon-bar"></span>
    //             </button>
    //             <NavLink className="navbar-brand" to="/">My Demo</NavLink>
    //         </div>
    //         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    //             <ul className="nav navbar-nav navbar-right">
    //                 <li className={match==="/" ? "active" : ''}><NavLink to="/">Home</NavLink></li>
    //             </ul>
    //         </div>
    //     </div>
    // </nav>

    <nav
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <NavLink className="navbar-brand" to="/">
        My Demo
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={match === "/" ? "active" : ""}>
            {/* <NavLink className="nav-link" to="/">Home</NavLink> */}
            {/* <a className="nav-link" href="#">
              Home
            </a> */}
          </li>
        </ul>
        <div className={match === "/" ? "nav-item active" : "nav-item"}>
          <NavLink className="nav-link" to="/">
          <button style={{color:'white'}} className="btn btn-sm btn-outline-secondary" type="button">Home</button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
