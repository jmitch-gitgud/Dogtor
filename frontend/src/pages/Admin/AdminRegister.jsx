import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";
import React from "react";

function AdminRegister() {
    return (
      <div>
        <Header />
        <div className="padding-top-128">
  
          <div className="gray-box">

          <nav>
            <Link to="/register-user">
              <button className="register-button register-user-button" type="button">
                Register User
              </button>
            </Link>
          </nav>

          <nav>
            <Link to="/register-pet">
              <button className="register-button register-pet-button" type="button">
                Register Pet
              </button>
            </Link>
          </nav>
          
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default AdminRegister;