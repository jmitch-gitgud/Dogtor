import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './AdminSelect.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.min.js';
import { Spin, Divider, Button, Form} from "antd";
import AdminNavBar from "../../components/AdminNavBar";



function ViewUserSchedule(){

    const { userId } = useParams();
    const [schedule,setSchedule]= useState([]);
    const [loading, setLoading]=useState(true);
    const localizer = momentLocalizer(moment);
    let [resultType, setType] = useState("Select a user ...");


   

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

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onFinish = async (values) => {
      const response = await fetch('/delete/'+resultType, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }     
      })
      const json = (await response.json()).data;
      if(json === undefined){
        console.log("Error")
      }
      else{
        console.log("Deleted")
        window.location.reload();
      }
    }

    let handleChangingOfType = (event) => {
      setType(event.target.value);
    };
  
    return (
      <>
      <div>
      <AdminNavBar />
            
        <Divider />
        

        
        <Spin spinning={loading} tip="Loading...">
        <div className="flex-container" >
         <div className="schedulerform" style={{ marginTop: "30px", width: "50%", marginRight: "5%"}} display= "flex">
         <Form onFinish={onFinish} onFinishFailed={onFinishFailed} name="basic" initialValues={{remember: true}} style={{background: "#D9D9D9"}}>

            <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>Add New Appointment</h1>
            <div>
            <Form.Item
            labelCol={{ span: 24 }}
            name="Pets Name"
            label="Appointment to delete "
            rules={[{ required: true, message: "This information is required." }]}>
            <select onChange={handleChangingOfType}>
            <option value="Select a type ..."> -- Select a value -- </option>
            {}
            {schedule.map((resultType,key) => (
              <option key={key} value={resultType.appointment_id}>{resultType.start_appointment_date}</option>
            ))}
            </select>
            </Form.Item>
            <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit">
             Submit
            </Button>
            </Form.Item>
            
            </div>
            </Form>
          </div>
          <Calendar 
            selectable
            align="left"
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