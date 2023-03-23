import AdminNavBar from "../../components/AdminNavBar";
import dunRoaminImg from '../images/DunRoamin.png';
import groomingAdImg from '../images/GroomingAd.jpg'
import dozenRosesImg from '../images/ADozenRoses.png'

import React from "react";

function welcome() {
  return(

    <div>
    <AdminNavBar />

    <div className="login-header padding-top-64"></div>

      <div className="welcomeform" style={{ marginTop: "30px"}}>

      <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>The World is Full of Opportunities!</h1>
        <div style={{ display: "flex" }}>
        <nav style={{ margin: "auto", marginBottom: "30px"}}>
        <a href="https://www.dunroaminstrayandrescue.com/contact_us.html"><img className="welcome-photo" alt="DunRoamin_icon" src={dunRoaminImg} width="400" height="300"/></a>
        </nav>
        <nav style={{ margin: "auto", marginBottom: "30px"}}>
        <a href="https://services.petsmart.com/grooming"><img className="welcome-photo" alt="grooming_icon" src={groomingAdImg} width="400" height="300"/></a>
        </nav>
        <nav style={{ margin: "auto", marginBottom: "30px"}}>
        <a href="https://www.facebook.com/profile.php?id=100081835885169"><img className="welcome-photo" alt="DozenRoses_icon" src={dozenRosesImg} width="400" height="300"/></a>
        </nav>
        </div>

        <div className="welcome-labels">
          <div className="welcome-label">Adopt a new friend or make a donation to DunRoamin!</div>
          <div className="welcome-label grooming-label">Is your pet ready for a fresh new look?</div>
          <div className="welcome-label dozen-label">Find a fur-ever friend or make a donation to A Dozen Roses!</div>
        </div>
    </div>
    </div>
);
    
}

export default welcome;