import Header from "../../components/Header";
import React from "react";
import { useEffect, useState } from "react";
import './AdminSelect.css';
import { useNavigate} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";


let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectPet(){

    const { user } = useParams();
    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a pet ...");
    const navigate = useNavigate();
    const now = 32;
    
    let handleChangingOfType = (event) => {
        setType(event.target.value);
      };


    useEffect(() => {
        (async () => {
          const response = await fetch('/viewUsersPet/'+user, {
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
    }, [user]);

    const handleSubmit = (event) => {
        if(resultType==="Select a pet ..."){
            alert('Please select pet')
        }
        else{
            console.log(resultType)
            navigate(`/admin-schedule/${user}/pet/${resultType}`);
        }
    }


    
      return (
        <div>
        <Header />
        <br></br>
        <p>Book Appointment: Select pet for appointment</p>
        <div>
        <ProgressBar now={now} label={`${now}%`} />
        </div>
          <div className="box2">
          <select onChange={handleChangingOfType}>
            <option value="Select a pet ..."> -- Select a pet -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.pet_id}>{resultType.pet_name}</option>
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

export default SelectPet;