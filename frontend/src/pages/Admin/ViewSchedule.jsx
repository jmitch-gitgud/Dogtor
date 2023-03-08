import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './userSelect.css';
//import {Routes, Route, useNavigate} from 'react-router-dom';
//import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';


import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.min.js';
import { Spin, Tag, Divider, Button, Form} from "antd";
import Header from "../../components/Header";
//import Footer from "../components/Footer";
import {DatePicker} from "antd";


function ViewUserSchedule(){

    const { userId } = useParams();

    const [schedule,setSchedule]= useState([]);
    const [loading, setLoading]=useState(true);
    const [selectedTag, setNextTags]=useState([]);
    const [resourceMap, setRessource]=useState([
          { resourceId: "Booking", resourceTitle: "Booking" },
        ],);
    const localizer = momentLocalizer(moment);
    const { CheckableTag } = Tag;
    const { RangePicker } = DatePicker;

    const employeeTagsData = ["Booking"];

   

    useEffect(() => {
      (async () => {
        const start=[];
        const response = await fetch('/findUserTimes/'+userId, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
          }     
        })
        const json = (await response.json()).data;
        if(json === undefined){
            setSchedule(start);
        }
        else{
          json.forEach((element) => {
            element.start = moment(element.start_appointment_date).toDate();
            element.end = moment(element.end_appointment_date).toDate();
            element.resourceId = element.resource_id
          });
          setSchedule(json)
          setLoading(false);
        }
     })();
    }, [userId]);

    const eventPropGetter = (event) => {
      let newStyle = {
        color: "black",
        borderRadius: "8px"
      };
  
      return {
        className: "",
        style: newStyle
      };
    };

    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked
        ? [...selectedTag, tag]
        : selectedTag.filter((t) => t !== tag);
      const nextResourceMap = [];
      nextSelectedTags.map((item) => {
        nextResourceMap.push({ resourceId: item, resourceTitle: item });
        return item;
      });
      setNextTags( nextSelectedTags);
      setRessource(nextResourceMap);
    };
  
    return (
      <>
      <div>
      <Header />
        <div align="center" style={{ marginTop: "30px"}}>
          <p>
            <span style={{ marginRight: 8 }}>Doctors & Technicians:</span>
            {employeeTagsData.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTag.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </p>

        </div>
        
        <Spin spinning={loading} tip="Loading...">
        <div className="flex-container" >
          <Calendar 
            selectable
            align="center"
            resizable
            defaultDate={moment().toDate()}
            defaultView="week"
            display= "inline-block"
            views={["week", "day"]} //"month", "week", "day"
            showMultiDayTimes
            text-align= "left"
            events={schedule}
            localizer={localizer}
            style={{ height: "50%", width: "50%"}}
            eventPropGetter={eventPropGetter}
            resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
          />
          </div>
        </Spin>
        </div>
      </>
    );
}

export default ViewUserSchedule;