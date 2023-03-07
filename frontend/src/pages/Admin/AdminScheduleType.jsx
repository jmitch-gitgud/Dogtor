import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { useEffect, useState } from "react";
import './userSelect.css';
import { Link } from "react-router-dom";
import {Routes, Route, useNavigate} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";


let start=[];

/* The following function deals with the first step in booking appointments*/
function AdminSelectType(){

    const { pet,user } = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a type ...");
    const navigate = useNavigate();
    const now = 75;
    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


    useEffect(() => {
        (async () => {
          const response = await fetch('/selectType', {
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
            navigate(`/admin-schedule/${user}/pet/${pet}/type/${resultType}`);
        }
        console.log(resultType)
    }


    
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
            <option value="Select a type ..."> -- Select a type -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.appointment_type_catagory}>{resultType.appointment_type_catagory}</option>
            ))}
          </select>
          <br />
          {}
          <br />
          <button onClick={handleSubmit}>Submit</button>
          <Footer />
          </div>
        </div>
      );
}

export default AdminSelectType;