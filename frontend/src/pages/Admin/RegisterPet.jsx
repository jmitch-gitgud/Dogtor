import AdminNavBar from "../../components/AdminNavBar";
import Footer from "../../components/Footer";

import React from "react";

function RegisterPet() {
  return (
    <div>
      <AdminNavBar />
      <div className="login-header padding-top-128">

        <div className="gray-box">
        <h1 className="padding-bottom-16">Register Pet</h1>
        
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPet;