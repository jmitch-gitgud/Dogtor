import AdminNavBar from "../../components/AdminNavBar";

import { Link } from "react-router-dom";
import React from "react";

function AdminRegister() {
    return (
      <div>
        <AdminNavBar />
        <div className="padding-top-128">
  
          <div className="register-gray-box">
          <nav>
            <Link to="/register-user-1">
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
      </div>
    );
  }
  
  export default AdminRegister;