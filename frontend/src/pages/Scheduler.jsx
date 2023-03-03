import React, { Component } from "react";
import moment from "moment";
import { findIndex } from "lodash";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.min.js';
//import "./App.css";
import { Spin, Tag, Divider, Button, Form, Input, Select} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { default as AddNewSchedule } from "../components/AddNewSchedule";
import { default as EditSchedule } from "../components/EditSchedule";
import Header from "../components/Header";
//import Footer from "../components/Footer";
import {DatePicker} from "antd";
const { Option } = Select;


const onFinish = (values) => {

  var doctor = values.resourceId;
  var tempDate = JSON.stringify(values.dates[0].$d);
  var startTime = tempDate.slice(12, 17);
  var hour = parseInt(startTime.slice(0, 2)) - 4;
  var time = JSON.stringify(hour);
  var success = 1;

  if(time.length < 2) {

    time = "0" + time;

  }

  var totalStartTime = time + tempDate.slice(14, 17);


  var newDate = tempDate.slice(1, 11);
  console.log("Success:", values);
  //Can directly call props here

  fetch("./data-EmployeeSchedule.json")
      .then((response) => response.json())
      .then((result) => {
        
        result.forEach((element) => {
          //for(let name of group.names)

          var scheduledDate = element.start.slice(0, 10);
          var scheduledStartTime = element.start.slice(11,13);
          var scheduledEndTime = element.end.slice(11,13);
          var scheduledDoctor = element.resourceId;
          //console.log(scheduledDate);

          if(doctor === scheduledDoctor)  {

            if(scheduledDate === newDate)  {

              console.log(scheduledDate);
              console.log(scheduledStartTime);

              if((totalStartTime < scheduledStartTime) || (totalStartTime > scheduledEndTime))  {

                  window.confirm("Appointment successfully booked!")
                  success = 0;

              }

              else  {

                window.confirm("Appointment is colliding with another appointment. Please try again.")
                success = 0;

              }

            }

          }

        })

        if(success === 1) {

          window.confirm("Appointment successfully booked!")
  
        }

      })
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


const localizer = momentLocalizer(moment);
const { CheckableTag } = Tag;
const { RangePicker } = DatePicker;


const employeeTagsData = ["Dr. David", "Dr. Erin", "Tech Jerry"];
const clientData = {
  "Dr. David": ["DS"],
  "Dr. Erin": ["ER"],
  "Tech Jerry": ["JC"]
};



class Scheduler extends Component {
  constructor() {
    super();
    
    this.state = {
      schedule: [],
      tempSchedule: [],
      loading: true,
      selectedTags: employeeTagsData,
      resourceMap: [
        { resourceId: "Dr. David", resourceTitle: "Dr. David" },
        { resourceId: "Dr. Erin", resourceTitle: "Dr. Erin" },
        { resourceId: "Tech Jerry", resourceTitle: "Tech Jerry" }
      ],
      employee: [],
      visible: false,
      editScheduleModalVisible: false,
      lastScheduleIndex: 450,
      record: [],
      resourceId: null,
      dates: []
    };
  }

  eventPropGetter = (event) => {
    let newStyle = {
      color: "black",
      borderRadius: "8px"
    };

    if (event.client === "DS") {
      newStyle.backgroundColor = "#fd3153";
    } else if (event.client === "SC") {
      newStyle.backgroundColor = "#1ccb9e";
    } else if (event.client === "KH") {
      newStyle.backgroundColor = "#F480A8";
    } else if (event.client === "SL") {
      newStyle.backgroundColor = "#fda256";
    } else if (event.client === "RM") {
      newStyle.backgroundColor = "#8281fd";
    }

    return {
      className: "",
      style: newStyle
    };
  };

  onCancel = () => {
    this.setState({ visible: false, record: [] });
  };

  handleHouseChange = (value) => {
    this.setState({ employee: clientData[value] });
  };

  handleChange = (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    const nextResourceMap = [];
    nextSelectedTags.map((item) => {
      nextResourceMap.push({ resourceId: item, resourceTitle: item });
      return item;
    });

    this.setState({
      selectedTags: nextSelectedTags,
      resourceMap: nextResourceMap
    });
  };

  addNewSchedule = () => {
    this.setState({ visible: true });
  };

  addSchedule = (newSchedule) => {
    let tempSchedules = this.state.schedule;

    let newTempSchedule = {
      ...newSchedule,
      title: newSchedule.lastName + ", " + newSchedule.firstName,
      start: moment(newSchedule.dates[0]).toDate(),
      end: moment(newSchedule.dates[1]).toDate(),
      scheduleId: this.state.lastScheduleIndex
    };

    tempSchedules.unshift(newTempSchedule);
    this.setState({
      schedule: tempSchedules,
      lastScheduleIndex: this.state.lastScheduleIndex + 1,
      visible: false
    });
  };

  updateSchedule = (scheduleId, values) => {
    let tempSchedules = this.state.schedule;
    let scheduleIndex = findIndex(this.state.schedule, {
      scheduleId: scheduleId
    });

    tempSchedules[scheduleIndex] = {
      ...tempSchedules[scheduleIndex],
      lastName: values.lastName,
      firstName: values.firstName,
      title: values.lastName + ", " + values.firstName,
      resourceId: values.resourceId,
      client: values.client,
      start: moment(values.dates[0]).toDate(),
      end: moment(values.dates[1]).toDate(),
      notes: values.notes
    };

    this.setState({ schedule: tempSchedules, editScheduleModalVisible: false });
  };

  editSchedule = (record) => {
    this.setState({
      editScheduleModalVisible: true,
      record: record,
      resourceId: record.resourceId,
      dates: [moment(record.start), moment(record.end)]
    });
  };

/*handleSubmit = (event) => {

    var { startTime, endTime } = document.forms[0];

    let data = {start: startTime.value, end: endTime.value};
    fetch("./data-EmployeeSchedule.json")
    .then((response) => response.json())
      .then((result) => {
        result.forEach((element) => {
          element.start = moment(element.start).toDate();
          element.end = moment(element.end).toDate();


        });
        this.setState({ schedule: result, loading: false });
      });
  }*/




  componentDidMount() {
    fetch("./data-EmployeeSchedule.json")
      .then((response) => response.json())
      .then((result) => {
        result.forEach((element) => {
          element.start = moment(element.start).toDate();
          element.end = moment(element.end).toDate();
        });
        this.setState({ schedule: result, loading: false });
      });
  }

  
  render() {

   

    

    const { selectedTags, resourceMap } = this.state;

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
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
            <span style={{ float: "right" }}>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={this.addNewSchedule}
              />
            </span>
          </p>

         {/* <p>
            <span style={{ marginRight: 8 }}>Clients:</span>
            <span
              className={
                "client " +
                (selectedTags.includes("Dr. David") ? "" : "display")
              }
            >
              <Tag color="#F480A8">1720 - DS</Tag>
            </span>
            <span
              className={
                "client " +
                (selectedTags.includes("Employee #1755") ? "" : "display")
              }
            >
              <Tag color="#fda256">1755 - SL</Tag>
              <Tag color="#8281fd">1755 - RM</Tag>
            </span>
            <span
              className={
                "client " +
                (selectedTags.includes("Employee #1775") ? "" : "display")
              }
            >
              <Tag color="#fd3153">1775 - DS</Tag>
              <Tag color="#1ccb9e">1775 - SC</Tag>
            </span>
            </p> */}
        </div>
            
        <Divider />
        

        
        <Spin spinning={this.state.loading} tip="Loading...">
        <div className="flex-container" >
         <div className="schedulerform" style={{ marginTop: "30px", width: "50%", marginRight: "5%"}} display= "flex">
         <Form onFinish={onFinish} onFinishFailed={onFinishFailed} name="basic" initialValues={{remember: true}} style={{background: "#D9D9D9"}}>

            <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>Add New Appointment</h1>
            <div>
            <Form.Item
             labelCol={{ span: 24 }}
             name="lastName"
             label="Last Name"
             rules={[{ required: true, message: "This information is required." }]}>
            <Input />
            </Form.Item>
            <Form.Item
            labelCol={{ span: 24 }}
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "This information is required." }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            labelCol={{ span: 24 }}
            name="resourceId"
            label="Doctor"
            rules={[{ required: true, message: "This information is required." }]}>
            <Select>
            {employeeTagsData.map((employee) => (
              <Option key={employee}>{employee}</Option>
            ))}
            </Select>
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
            events={this.state.schedule}
            localizer={localizer}
            style={{ height: "50%", width: "50%"}}
            eventPropGetter={this.eventPropGetter}
            resources={resourceMap}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            onSelectEvent={(record) => this.editSchedule(record)}
          />
          </div>
        </Spin>
        
        <AddNewSchedule
          {...this.state}
          onCancel={this.onCancel}
          handleHouseChange={this.handleHouseChange}
          employeeTagsData={employeeTagsData}
          addSchedule={this.addSchedule}
        />

        <EditSchedule
          {...this.state}
          onCancel={this.onCancel}
          handleHouseChange={this.handleHouseChange}
          employeeTagsData={employeeTagsData}
          updateSchedule={this.updateSchedule}
        />
        </div>
      </>
    );
  }
}

export default Scheduler;
