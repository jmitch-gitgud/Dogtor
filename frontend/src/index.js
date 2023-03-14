import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StaffWelcome from "./pages/StaffWelcome";
import ClientWelcome from "./pages/Client/ClientWelcome";
import AdminWelcome from "./pages/Admin/AdminWelcome";

import registerServiceWorker from './components/registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AdminRegister from "./pages/Admin/AdminRegister";
import RegisterUser from "./pages/Admin/RegisterUser";
import RegisterPet from "./pages/Admin/RegisterPet";
import AdminPetProfiles from "./pages/Admin/AdminPetProfiles";
import AdminSchedule from "./pages/Admin/AdminSchedule";
import AdminSettings from "./pages/Admin/AdminSettings";
import ViewUsers from "./pages/Admin/ViewUsers";
import ViewUsersPets from "./pages/Admin/ViewUsersPets";
import ViewPet from "./pages/Admin/ViewPet";
import SelectType from "./pages/Users/SelectType";
import SelectValue from "./pages/Users/SelectValue";
import SelectPerformer from "./pages/Users/SelectPerformer";
import Reformat from "./pages/Users/Reformat";
import SelectUser from "./pages/Admin/AdminSchedule";
import SelectPet from "./pages/Admin/AdminSchedulePet";
import AdminSelectType from "./pages/Admin/AdminScheduleType";
import AdminSelectValue from "./pages/Admin/AdminScheduleValue"
import AdminSelectPerformer from "./pages/Admin/AdminSchedulePerformer"
import AdminReformat from "./pages/Admin/AdminScheduleBooking"
import ViewUserSchedule from "./pages/Admin/ViewSchedule"
import UserHome from "./pages/Users/UserHomePage"
import AdminHome from "./pages/Admin/AdminHomePage"
import ViewSpecUserSchedule from "./pages/Users/ViewUserSchedule"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="admin-welcome" element={<AdminWelcome />} />
            <Route path="client-welcome" element={<ClientWelcome />} />
            <Route path="staff-welcome" element={<StaffWelcome />} />

            <Route path="register" element={<AdminRegister />} />
            <Route path="register-user" element={<RegisterUser />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="admin/pet-profiles" element={<AdminPetProfiles />} />
            <Route path="admin-schedule" element={<AdminSchedule />} />
            <Route path="admin-settings" element={<AdminSettings />} />
            <Route path="admin-view-users" element={<ViewUsers />} />
            <Route path="admin-view-users-schedule/:userId" element={<ViewUserSchedule />} />
            <Route path="admin-view-users-pets/:id" element={<ViewUsersPets />} />
            <Route path="admin-view-users-pet/:id" element={<ViewPet />} />
            <Route path="user-select-type/:userId" element={<SelectType />} />
            <Route path="user-select-type/:userId/type/:type" element={<SelectValue />} />
            <Route path="user-select-type/:userId/type/:type/type-id/:id" element={<SelectPerformer />} />
            <Route path="user-schedule/:id/staff/:staffId/user/:userId" element={<Reformat />} />
            <Route path="admin-schedule" element={<SelectUser />} />
            <Route path="admin-schedule/:user" element={<SelectPet />} />
            <Route path="admin-schedule/:user/pet/:pet" element={<AdminSelectType />} />
            <Route path="admin-schedule/:user/pet/:pet/type/:type" element={<AdminSelectValue />} />
            <Route path="admin-schedule/:user/pet/:pet/type/:type/value/:value" element={<AdminSelectPerformer />} />
            <Route path="admin-schedule/:user/pet/:pet/type/:type/value/:value/staff/:staffid" element={<AdminReformat />} />
            <Route path="user/:userId" element={<UserHome />} />
            <Route path="view-user-schedule/:userId" element={<ViewSpecUserSchedule />} />
            <Route path="admin" element={<AdminHome />} />
                        
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById("root"));
  registerServiceWorker();