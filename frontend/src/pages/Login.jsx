import Header from "../components/Header";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {


  let [resultType, setType] = useState("Select a type ...");
  const [errorMessages, setErrorMessages] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  let nextPage;

  const navigate = useNavigate();

  const errors = {
    "Invalid": "Invalid Username or Password",
    "Error": "ERROR: looks like something went wrong..."
  };
  
  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
  );

  

  const options = [
    {value: "admin", label: "Admin"},
    {value: "client", label: "Client"},
    {value: "staff", label: "Staff"}
  ];

  let handleChangingOfType = (event) => {
    setType(event.target.value);
  };

  const handleSubmit2 = (event) => {

    if(resultType==="Select a type ..."){
      setErrorMessages({ name: "Invalid", message: errors.Invalid });
    }
    else{
      var { uname, pass } = document.forms[0];
    var status;
    let data = {Username: uname.value, Password: pass.value, Role: resultType};
    console.log(data);
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
        nextPage = data.page;

        if(nextPage === '/admin-welcome'){
          navigate(`/admin-welcome`)
        }
        if(nextPage === '/client-welcome'){
          navigate(`/client-welcome`)
        }
        if(nextPage === '/staff-welcome'){
          navigate(`/staff-welcome`)
        }

      } else if (status === "Invalid credentials") {
        setErrorMessages({ name: "Invalid", message: errors.Invalid });
      } else {
        setErrorMessages({ name: "Error", message: errors.Error });
      }    
    });
  event.preventDefault();
    }
  }

  return (
    <div>
      <Header />
      <div className="form">
      <form onSubmit={handleSubmit2}>
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
        <div>
          <select onChange={handleChangingOfType}>
            <option value="Select a type ..."> -- Select a value -- </option>
            {}
            {options.map((resultType,key) => (
              <option key={key} value={resultType.value}>{resultType.label}</option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <input type="submit" value="Login" className="login-button"/>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;