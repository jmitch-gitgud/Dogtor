import Header from "../../components/Header";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './userSelect.css';
import {useNavigate} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


let start=[];

/* The following function deals with the first step in booking appointments*/
function AdminSelectValue(){

    const { pet,user,type } = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a value ...");
    const navigate = useNavigate();
    const now = 80;
    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


    useEffect(() => {
        (async () => {
          const response = await fetch('/viewType/'+type, {
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
    }, [type]);

    const handleSubmit = (event) => {
        if(resultType==="Select a value ..."){
            alert('Please Select value of appointment')
        }
        else{
            navigate(`/admin-schedule/${user}/pet/${pet}/type/${type}/value/${resultType}`);
        }
    }
  
    console.log(results)


    
      return (
        <div>
        <Header />
        <br></br>
        <p>Book Appointment: Select classsification of appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        </div>
          <div className="centered">
          <select onChange={handleChangingOfType}>
            <option value="Select a type ..."> -- Select a value -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.appointment_type_id}>{resultType.appointment_type_value}</option>
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

export default AdminSelectValue;