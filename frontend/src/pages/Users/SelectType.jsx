import Header from "../../components/Header";
import React from "react";
import { useEffect, useState } from "react";
import './userSelect.css';

let start=[];

/* The following function deals with the first step in booking appointments*/
function SelectType(){

    const [results, setData] = useState([]);
    let [resultType, setType] = useState("Select a type ...");
    
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
        else if(resultType==="Emergency Appointment"){
            alert('Please contact clinic for imidiate assistance at 902-XXX-XXXX')
        }
        else if(resultType==="Surgeries"){
            alert('Please contact clinic in order to discuss next steps at 902-XXX-XXXX')
        }
        console.log(resultType)
    }
  
    console.log(results)


    
      return (
        <div>
        <Header />
          <div className="centered">
          <select onChange={handleChangingOfType}>
            <option value="Select a type ..."> -- Select a fruit -- </option>
            {}
            {results.map((resultType,key) => (
              <option key={key} value={resultType.appointment_type_catagory}>{resultType.appointment_type_catagory}</option>
            ))}
          </select>
          <br />
          {}
          {resultType}
          <br />
          <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      );
}

export default SelectType;