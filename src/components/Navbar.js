import React from "react";
import { Link } from "gatsby";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/artists">
          Artists
        </Link>
        <Link className="navbar-item" to="/calendar">
          Calendar
        </Link>
        <Link className="navbar-item" to="/resources">
          Resources
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
      </div>
      </nav>
    );
  }
};

export default Navbar;
