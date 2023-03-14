import Header from "../../components/Header";

import { Link } from "react-router-dom";
import React from "react";

import {Routes, Route, useNavigate} from 'react-router-dom';

function UserHome() {
  return (
    <div>
      <Header />
      <div className="login-header padding-top-128">
        <div className="centered2">
        <h1 className="padding-bottom-16">The Dogtor will see you now </h1>
        <p className="padding-bottom-32">Let's get started</p> 
        <Link to={`/user-select-type`}>
                Schedule Appointment
        </Link> 
        <br></br>
        <Link to={`/user-select-type`}>
                View Schedule
        </Link> 
        </div>
      </div>
    </div>
  );
}

export default UserHome;