import Header from "../components/Header";
import ChooseOption from "../utility/ChooseOption";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const optionNames = [
    {value: "admin", label: "Admin"},
    {value: "client", label: "Client"},
    {value: "staff", label: "Staff"}
  ];

  const [passwordShown, setPasswordShown] = useState(false);

  let nextPage;
  
  const errors = {
    "Invalid": "Invalid Username or Password",
    "Error": "ERROR: looks like something went wrong..."
  };

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  }

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    var { uname, pass } = document.forms[0];
    var status;

    let data = {Username: uname.value, Password: pass.value};
    fetch('/check', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json'
     } 
    }).then(function(response) {
      return response.json();
    }).then(data => {
      status = data.status;
      nextPage = data.page;

      if (status === "Logged in") {
        setIsSubmitted(true);
        nextPage = data.page;

        if(nextPage === '/admin-welcome'){
          setIsAdmin(true);
        }
        if(nextPage === '/client-welcome'){
          setIsClient(true);
        }
        if(nextPage === '/staff-welcome'){
          setIsStaff(true);
        }

      } else if (status === "Invalid credentials") {
        setErrorMessages({ name: "Invalid", message: errors.Invalid });
      } else {
        setErrorMessages({ name: "Error", message: errors.Error });
      }    
    });
  event.preventDefault();
};
  
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-label">Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="padding-bottom-24">
          <label className="input-label">Password </label>
          <input type={passwordShown ? "text" : "password"} name="pass" required placeholder="" />
          <button className= "password-button" type="button" onClick={togglePassword}>View Password</button> 
        </div>
        <div>
        {renderErrorMessage("Invalid")}
        {renderErrorMessage("Error")}
        </div>
        <label className="input-label">Hi! I am... </label>
        <ChooseOption placeHolder="Select..." options={optionNames}/>
        <div className="button-container">
          <input type="submit" value="Login" className="login-button"/>
        </div>
      </form>
    </div>
  );

  const emptyRender = (
    <div>
    </div>
  );

  
  return (
    <div>
      <Header />
      <div className="login-form padding-top-32">
        {isSubmitted ? 
          <div className="login-success">
          
          {isAdmin ?
            navigate('/admin-welcome') : emptyRender
          }

          {isClient ?
            navigate('/client-welcome') : emptyRender
          }

          {isStaff ?
            navigate('/staff-welcome') : emptyRender
          }
          
        </div> : renderForm}
      </div>
    </div>
  );
}

export default Login;