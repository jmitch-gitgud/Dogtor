import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { useEffect } from "react";

function ViewUsers() {

    const getUsers = () => {
        var status;
        let data = {};
        fetch('/viewUsers', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }     
        }).then(function(response) {
        return response.json();
         }).then(data => {
        status = data.status;   
        });
    }

    useEffect(() => {
        getUsers()
    });

  return (
    <div>
      <Header />
      <div className="login-header padding-top-128">
        <div className="gray-box">
        <h1 className="padding-bottom-16">View Users</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewUsers;