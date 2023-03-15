import AdminNavBar from "../../components/AdminNavBar";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserTable.css';
import { Link } from "react-router-dom";
  
let start=[];

/*Based on the id of the users provided, the system will return a table of the pets attached to that specfic user */
function ViewUsersPets() {

    const { id } = useParams();
    const [results, setData] = useState([]);

    useEffect(() => {
        (async () => {
          const response = await fetch('/viewUsersPet/'+id, {
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
      },[id]);
  
    console.log(results)

/* Will return a table that present all the pets attached to a specifc user specifed by the id*/
    return (
      
      <div>
      <AdminNavBar />
      <div className="login-header padding-top-128">
      <div className="petform">
      <h1 className="padding-bottom-16"><b>View The User's Pets</b></h1>
        <div className="UserTable">
        <table>
          <tbody>
          <tr>
            <th>Id</th>
            <th>Pet Name</th>
            <th>View Pet</th>
          </tr>
          {results.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.pet_id}</td>
                <td>{val.pet_name}</td>
                <td><Link to={`/admin-view-users-pet/${val.pet_id}`}>
                  view pet
                </Link> </td>
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

export default ViewUsersPets;