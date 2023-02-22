import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div style={{ display: "flex" }}>
      <h2>Dogtor</h2>
      
      <nav style={{ marginLeft: "auto", marginBottom: "auto" }} >
        <Link to="/login">
            <button className="toolbar-button" type="button">
             Pet Profiles
            </button>
        </Link>
      </nav>
      
      <nav style={{ marginLeft: "5px"}}  >
        <Link to="/login">
            <button className="toolbar-button" type="button">
                Register
            </button>
        </Link>
      </nav>

      <nav style={{ marginLeft: "5px"}}  >
        <Link to="/login">
            <button className="toolbar-button" type="button">
                Schedule
            </button>
        </Link>
      </nav>

      <nav style={{ marginLeft: "5px"}}  >
        <Link to="/login">
            <button className="toolbar-button" type="button">
                Settings
            </button>
        </Link>
      </nav>

      <nav style={{ marginLeft: "5px"}}  >
        <Link to="/login">
            <button className="toolbar-button" type="button">
                Logout
            </button>
        </Link>
      </nav>

      </div>
    </header>
  );
}

export default Header;