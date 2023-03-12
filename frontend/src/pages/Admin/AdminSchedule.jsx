import Header from "../../components/Header";
import React from "react";
import { useEffect, useState } from "react";
import './userSelect.css';
import { useNavigate} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectUser(){

    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a user ...");
    const navigate = useNavigate();
    const now = 25;
    
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
        if(resultType==="Select a type ..."){
            alert('Please Select type of appointment')
        }
        else{
            console.log(resultType)
            navigate(`/admin-schedule/${resultType}`);
        }
    }


    
      return (
        <div>
        <Header />
        <br></br>
        <p>Book Appointment: Select user for appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        </div>
          <div className="centered">
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