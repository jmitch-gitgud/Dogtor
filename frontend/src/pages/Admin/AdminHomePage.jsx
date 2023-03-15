import AdminNavBar from "../../components/AdminNavBar";

import { Link } from "react-router-dom";
import React from "react";
import './AdminSelect.css';

function AdminHome() {
  return (
    <div>
      <AdminNavBar />
      <div className="login-header padding-top-128">
        <div className="box1">
        <h1 className="padding-bottom-16">The Dogtor will see you now </h1>
        <p className="padding-bottom-32">Let's get started</p> 
        <Link to={`/admin-schedule`}>
                Schedule a users Appointment
        </Link> 
        <br></br>
        <Link to={`/admin-view-users`}>
                View Users/Pets/Schedule
        </Link> 
        </div>
      </div>
    </div>
  );
}

export default AdminHome;