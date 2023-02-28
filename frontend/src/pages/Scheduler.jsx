import React, { Component } from "react";
import moment from "moment";
import { findIndex } from "lodash";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'antd/dist/antd.min.js';
//import "./App.css";
import { Spin, Tag, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { default as AddNewSchedule } from "../components/AddNewSchedule";
import { default as EditSchedule } from "../components/EditSchedule";
import Header from "../components/Header";
//import Footer from "../components/Footer";
import {DatePicker} from "antd";

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
            <h1 className="padding-bottom-16" style={{textAlign: "center", marginBottom: "30px"}}>Add New Appointment</h1>
            <div>
            <div style={{textAlign: "center", marginBottom: "30px"}}>
              <label className="input-label">Last Name </label>
              <input type="text" name="uname" required />
            </div>
            <div style={{textAlign: "center", marginBottom: "30px"}}>
              <label className="input-label">First Name </label>
              <input type="text" name="uname" required />
            </div>
            <div style={{textAlign: "center", marginBottom: "30px"}}>
              <label className="input-label">Doctor </label>
              <input type="text" name="uname" required />
            </div>
            <div style={{textAlign: "center", marginBottom: "30px"}}>
              <label className="input-label">Date </label>
              <div style={{marginBottom: "20px"}}></div>
              <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
            </div>
            <div className="button-container">
              <input type="submit" value="Add" />
            </div>
            
            </div>
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
