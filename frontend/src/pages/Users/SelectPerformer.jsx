import React from "react";
import { useEffect, useState } from "react";
import './userSelect.css';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from "antd";
import ClientNavBar from "../../components/ClientNavBar";



let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectPerformer(){

    const {id,userId} = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select who will perform ...");
    const navigate = useNavigate();
    const now = 60;

    
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
        if(resultType==="Select who will perform ..."){
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
          navigate(`/user-schedule/${id}/staff/${resultId}/user/${userId}`);
        }
    }

    console.log(results)


    
      return (
        <div>
        <ClientNavBar />
        <br></br>
        <p>Book Appointment: Select who will perform appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        <Divider/>
        <p> * If a vet is not seen it is due to the fact that currently are not qualified to perform task </p>
        </div>
          <div className="centered2">
          <select onChange={handleChangingOfType}>
            <option value="Select who will perform ..."> -- Select who will perform -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.staff_username}>{resultType.staff_username}</option>
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

export default SelectPerformer;