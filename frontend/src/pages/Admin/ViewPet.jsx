import AdminNavBar from "../../components/AdminNavBar";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserTable.css';

let start=[];

/* The view pet function will print all the pets information on the page. The pet will be specifed by the Id*/
function ViewPet(){
    const { id } = useParams();
    const [results, setData] = useState([]);

    useEffect(() => {
        (async () => {
          const response = await fetch('/viewPet/'+id, {
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

    /*Returns a formated version of the information which will provide the admin with all the information regarding the pet  */
    return (
        <div>
        <AdminNavBar />
        <div className="login-header padding-top-128">
        <div className="pet-info-box">
        <h1 className="padding-bottom-16"><b>View The Client's Pet Information</b></h1>
          <div className="UserTable" style={{marginBottom: "750px" }}>
              {results.map((pet) => {
                return(
                  <div key={pet.pet_id}>
                    <h1>Pet Information</h1>
                    <p>Name: {pet.pet_name}</p>
                    <p>Active: {pet.pet_active}</p>
                    <p>Age: {pet.pet_age}</p>
                    <p>Neutered : {pet.pet_neutered}</p>
                    <p>Set : {pet.pet_sex}</p>
                    <p>Pet behaviour : {pet.pets_behaviour}</p>
                    <p>Who Performed : {pet.who_performed_last}</p>
                    <p>Appointement: *add later</p>
                  </div>
                );
              })}
          </div>
          </div>
        </div>
      </div>
        );


}

export default ViewPet;