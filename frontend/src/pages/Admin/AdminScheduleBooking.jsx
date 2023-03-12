import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './userSelect.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.min.js';
import { Spin, Divider, Button, Form} from "antd";
import Header from "../../components/Header";
import {DatePicker} from "antd";
import { useNavigate} from 'react-router-dom';


function AdminReformat(){

    const navigate = useNavigate();
    const [results, setData] = useState([]);
    const [additionInfo, setInfo] = useState('');
    const { staffid,user,value,pet } = useParams();
    const [schedule,setSchedule]= useState([]);
    const [loading, setLoading]=useState(true);
    const localizer = momentLocalizer(moment);
    const { RangePicker } = DatePicker;

    useEffect(() => {
      (async () => {
        const start=[];
        const response = await fetch('/findTimesForStaff/'+staffid, {
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
          json.forEach((element) => {
            element.start = moment(element.start_appointment_date).toDate();
            element.end = moment(element.end_appointment_date).toDate();
            element.resourceId = element.resource_id
          });
          setSchedule(json)
          setLoading(false);
        }
     })();
    }, [staffid]);



    const clientId  = "f827d38b-764a-4018-b6aa-1f2688bd84d0";


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

    const onFinish = async (values) => {

      let startTimes = values.dates[0].$d
      let dt1 = moment(startTimes)
      let startDate1=dt1.format('DD');
      let starthour1=dt1.format('HH:mm');

      let endTimes = values.dates[1].$d
      let dt2 = moment(endTimes)
      let startDate2=dt2.format('DD');
      let starthour2=dt2.format('HH:mm');

      var result = 1;

      if(startDate1 !== startDate2){
        console.log("Cannot Schedule on different days");
      }

      else{
        schedule.forEach((element) => {
          var dateElement=moment(element.end_appointment_date);
          dateElement=dateElement.format('DD')
          var startTimeElement1=moment(element.start_appointment_date);
          startTimeElement1 = startTimeElement1.format('HH:mm');
          var endTimeElement2=moment(element.end_appointment_date);
          endTimeElement2=endTimeElement2.format('HH:mm');

          if(dateElement===startDate1 && dateElement===startDate2){
            if((starthour1 > startTimeElement1 && starthour2 < endTimeElement2) 
              || (starthour1 > startTimeElement1 && starthour1 < endTimeElement2)
              || (starthour2 > startTimeElement1  && starthour2 < endTimeElement2)){
              result=0;
            }
          }
        })

        if(result===1 && results != null){
            window.confirm("Appointment successfully booked!");
            startTimes = moment(values.dates[0].$d);
            endTimes =  moment(values.dates[1].$d);

            let data = {start_appointment_date: startTimes.format('YYYY-MM-DD HH:mm:ss'), 
                      end_appointment_date: endTimes.format('YYYY-MM-DD HH:mm:ss'),
                      appointment_type_id: value,
                      assigned_client_id: user,
                      assigned_pets_id: pet,
                      staff_id: staffid,
                      resource_id: "Booking",
                      notes: additionInfo};
            console.log(data);


        const response = await fetch('/adminBook', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json'
          }     
        })
        const json = (await response.json()).data;
        if(json === undefined){
          console.log("Error")
        }
        else{
          console.log("Input")
          navigate(`/admin-view-users-schedule/${user}`);
        }
        }

        else{
          window.confirm("Appointment is colliding with another appointment. Please try again.")
        }

      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const handleChangeText=(event) =>{
      setInfo(event.target.value);
    }
  
    return (
      <>
      <div>
      <Header />
            
        <Divider />
        

        
        <Spin spinning={loading} tip="Loading...">
        <div className="flex-container" >
         <div className="schedulerform" style={{ marginTop: "30px", width: "50%", marginRight: "5%"}} display= "flex">
         <Form onFinish={onFinish} onFinishFailed={onFinishFailed} name="basic" initialValues={{remember: true}} style={{background: "#D9D9D9"}}>

            <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>Add New Appointment</h1>
            <div>
            <Form.Item
             labelCol={{ span: 24 }}
             name="Addition Information"
             label="Addition Information"
             rules={[{ required: true, message: "This information is required." }]}>
             <textarea value={additionInfo} onChange={handleChangeText} />
            </Form.Item>
            <Form.Item
            labelCol={{ span: 24 }}
            name="dates"
            label="Time"
            rules={[{ required: true, message: "This information is required." }]}
            >
            <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" type="date" name="time"/>
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

export default AdminReformat;