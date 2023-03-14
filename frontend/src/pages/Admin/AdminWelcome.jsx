import AdminNavBar from "../../components/AdminNavBar";

import React from "react";

function welcome() {
    return(

        <div>
        <AdminNavBar />

        <div className="login-header padding-top-64"></div>
        
          <button className="login-button" type="button">
                Edit
          </button>

          <div className="welcomeform" style={{ marginTop: "30px"}}>

          <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>The World is Full of Opportunities!</h1>
            <div style={{ display: "flex" }}>
            <nav style={{ margin: "auto", marginBottom: "30px"}}>
              <button className="login-button" type="button" style={{ width:"300px", height:"200px" }}>Local Advertisement</button>
            </nav>
            <nav style={{ margin: "auto", marginBottom: "30px"}}>
              <button className="login-button" type="button" style={{ width:"300px", height:"200px" }}>Donation</button>
            </nav>
            <nav style={{ margin: "auto", marginBottom: "30px"}}>
              <button className="login-button" type="button" style={{ width:"300px", height:"200px" }}>Adoption Service</button>
            </nav>
            </div>
        </div>
        </div>
    );
    

}

export default welcome;