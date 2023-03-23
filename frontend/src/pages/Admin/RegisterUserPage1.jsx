import AdminNavBar from "../../components/AdminNavBar";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  // Dropdown logic
  const [showMenu, setShowMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);
  const placeHolder = "Select..."
  const options = [
    {value: "admin", label: "Admin"},
    {value: "client", label: "Client"},
    {value: "staff", label: "Staff"}
  ];

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

  // Registration Logic
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  }
  
  const handleSubmit = (event) => {
    var { firstName, lastName, email } = document.forms[0];
    var status;

    let data = {FirstName: firstName.value, LastName: lastName.value, Email: email.value, Role: selectedValue.value};
    fetch('/register-user-step-1', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
       } 
      }).then(function(response) {
        return response.json();
      }).then(data => {
        status = data.status;
        if (status === "Step 1 in Registration Successful") {
          setIsSubmitted(true);
        }   
      });
    event.preventDefault();
  };

  const handleCancel = () => { 
    navigate('/register');
  }
  
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-label">First Name </label>
          <input type="text" name="firstName" required />
        </div>
        <div>
          <label className="input-label">Last Name </label>
          <input type="text" name="lastName" required />
        </div>
        <div>
          <label className="input-label">Email </label>
          <input type="text" name="email" required />
        </div>
        <label className="input-label">Role </label>
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
          <input type="submit" value="Next" />
          <input type="button" value="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
  
  return (
    <div>
      <AdminNavBar />
      <div className="login-form">
      <span className="page-marker">1/2</span>
        <div className="login-header">
        </div>
        {isSubmitted ? <div className="login-success">User is successfully logged in [insert home page here]</div> : renderForm}
      </div>
    </div>
  );
}

export default RegisterUser;