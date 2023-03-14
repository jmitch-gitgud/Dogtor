import Header from "../components/Header";

import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div className="login-header padding-top-128">

        <div className="gray-box">
        <h1 className="padding-bottom-16">Welcome to the Dogtor Web Application</h1>
        <p className="padding-bottom-32">Here for all of your vet scheduling needs!</p>
        <nav>
          <Link to="/login">
            <button className="login-button home-button" type="button">
              Continue
            </button>
          </Link>
        </nav>
        
        </div>
      </div>
    </div>
  );
}

export default Home;