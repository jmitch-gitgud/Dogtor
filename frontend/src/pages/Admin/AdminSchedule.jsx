import React from "react";
import { useEffect, useState } from "react";
import './AdminSelect.css';
import { useNavigate} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from "../../components/AdminNavBar";


let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectUser(){

    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a user ...");
    const navigate = useNavigate();
    const now = 16;
    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


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

    const handleSubmit = (event) => {
        if(resultType==="Select a user ..."){
            alert('Please select a user')
        }
        else{
            console.log(resultType)
            navigate(`/admin-schedule/${resultType}`);
        }
    }


    
      return (
        <div>
        <AdminNavBar />
        <br></br>
        <p>Book Appointment: Select user for appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        </div>
          <div className="box2">
          <select onChange={handleChangingOfType}>
            <option value="Select a user ..."> -- Select a user -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.client_id}>{resultType.client_username}</option>
            ))}
          </select>
          <br />
          {}
          <br />
          <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      );
}

export default SelectUser;