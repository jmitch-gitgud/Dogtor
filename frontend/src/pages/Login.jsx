import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  // Dropdown logic
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);
  const placeHolder = "Select..."

  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);

    return () => {
        window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  const getDisplay = () => {
    if(selectedValue) {
        return selectedValue.label;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
  }

  const isSelected = (option) => {
    if(!selectedValue) {
        return false;
    }

    return selectedValue.value === option.value;
  }

  // Login logic
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const options = [
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
  
  const handleSubmit = (event) => {
    var { uname, pass } = document.forms[0];
    var status;

    let data = {Username: uname.value, Password: pass.value, Role: selectedValue.value};
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
          setIsClient(false);
          setIsStaff(false);
        }
        if(nextPage === '/client-welcome'){
          setIsAdmin(false);
          setIsClient(true);
          setIsStaff(false);
        }
        if(nextPage === '/staff-welcome'){
          setIsAdmin(false);
          setIsClient(false);
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
        <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
          {showMenu && (
            <div className="dropdown-menu">
            {options.map((option) => (
            <div
            onClick={() => onItemClick(option)} 
            key={option.value} 
            className={`dropdown-item ${isSelected(option) && "selected"}`}>
              {option.label}
            </div>
          ))}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
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

          {isStaff ?
            navigate('/staff-welcome') : emptyRender
          }

          {isClient ?
            navigate('/client-welcome') : emptyRender
          }
          
        </div> : renderForm}
      </div>
    </div>
  );
}

export default Login;