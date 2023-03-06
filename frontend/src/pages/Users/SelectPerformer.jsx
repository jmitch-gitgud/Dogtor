import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { useEffect, useState } from "react";
import './userSelect.css';
import { Link } from "react-router-dom";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectPerformer(){

    const {type,id} = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a type ...");
    const navigate = useNavigate();
    const now = 75;

    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


    useEffect(() => {
        (async () => {
          const response = await fetch('/findPerfomer/'+id, {
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
    }, [id]);

    const handleSubmit = (event) => {

        let resultId;
        if(resultType==="Select a type ..."){
            alert('Please Select type of appointment')
        }
        else{
          results.forEach((element) => {
            var e1=element.staff_username;
            var e2=resultType;
            if(e1===e2){
              resultId=element.staff_id;
            }
          });
          navigate(`/user-schedule/${id}/staff/${resultId}`);
        }
    }

    console.log(results)


    
      return (
        <div>
        <Header />
        <br></br>
        <p>Book Appointment: Select type of appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        </div>
          <div className="centered">
          <select onChange={handleChangingOfType}>
            <option value="Select a type ..."> -- Select a type -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.staff_username}>{resultType.staff_username}</option>
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

export default SelectPerformer;