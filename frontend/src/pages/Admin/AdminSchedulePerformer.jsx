import React from "react";
import { useEffect, useState } from "react";
import './AdminSelect.css';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from "../../components/AdminNavBar";


let start=[];

/* The following function deals with selecting the staff member for the appointment based on information submitted*/
function AdminSelectPerformer(){

    const {pet,type,user,value} = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a performer ...");
    const navigate = useNavigate();
    const now = 80;

    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


    useEffect(() => {
        (async () => {
          const response = await fetch('/findPerfomer/'+value, {
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
    }, [value]);

    const handleSubmit = (event) => {

        if(resultType==="Select a performer ..."){
            alert('Please Select type of appointment')
        }
        else{
          navigate(`/admin-schedule/${user}/pet/${pet}/type/${type}/value/${value}/staff/${resultType}`);
        }
    }

    console.log(results)


    
      return (
        <div>
        <AdminNavBar />
        <br></br>
        <p>Book Appointment: Select who will perform appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        <p> * If a vet is not seen it is due to the fact that currently are not qualified to perform task </p>
        </div>
          <div className="box3">
          <select onChange={handleChangingOfType}>
            <option value="Select a performer ..."> -- Select a performer -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.staff_id}>{resultType.staff_username}</option>
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

export default AdminSelectPerformer;