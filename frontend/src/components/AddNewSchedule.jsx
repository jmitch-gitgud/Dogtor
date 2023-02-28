import React from "react";
import { default as ScheduleForm } from "./Schedule-Form";
import { Modal, Form } from "antd";
import moment from "moment";

const AddNewSchedule = ({
  visible,
  record,
  onCancel,
  handleHouseChange,
  addSchedule,
  employee,
  employeeTagsData,
  resourceId,
  dates
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add New Schedule"
      width={1000}
      onCancel={onCancel}
      onOk={() => {
        fetch("./data-EmployeeSchedule.json")
        form
        
        .then((response) => response.json())
        .then((result) => {
        result.forEach((element) => {
           
          if(moment(element) === dates){
              window.confirm("Event Collision Detected")
          }

        })
      
        })
        .validateFields()
        .then((values) => {
          form.resetFields();
          addSchedule(values);
        })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <ScheduleForm
        form={form}
        record={record}
        handleHouseChange={handleHouseChange}
        employee={employee}
        employeeTagsData={employeeTagsData}
        resourceId={resourceId}
        dates={dates}
      />
    </Modal>
  );
};

export default AddNewSchedule;
