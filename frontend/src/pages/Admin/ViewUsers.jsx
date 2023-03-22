import AdminNavBar from "../../components/AdminNavBar";
import React from "react";
import { useEffect, useState } from "react";
import './UserTable.css';
import { Link } from "react-router-dom";

let start=[];


/*View Users: This functions serves as a way for admins to view all the current active users in the system */
function ViewUsers() {

    const [results, setData] = useState([]);

    useEffect(() => {
      (async () => {
        const response = await fetch('/viewUsers', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
          }     
        })
        const json = (await response.json()).data;
        if(json === undefined){
          setData(start);
        }
        else{
          setData(json);
        }
      })();
    }, []);

  console.log(results)

  /* Returns the values stored as a table, so that the admins can select which user they would like to see */
  return (
    <div>
      <AdminNavBar />
      <div className="login-header padding-top-128">
      <div className="pet-info-box">
      <h1 className="padding-bottom-16"><b>View All Clients</b></h1>
        <div className="UserTable">
        <table style={{marginBottom: "750px" }}>
          <tbody>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Pets</th>
            <th>Schedule</th>
          </tr>
          {results.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.client_id}</td>
                <td>{val.client_username}</td>
                <td>
                <Link to={`/admin-view-users-pets/${val.client_id}`}>
                  View pets
                </Link> 
                </td>
                <td>
                <Link to={`/admin-view-users-schedule/${val.client_id}`}>
                  View schedule
                </Link> 
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  );
}

export default ViewUsers;