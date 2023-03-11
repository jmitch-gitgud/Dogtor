import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

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

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="welcome" element={<Welcome />} />
            <Route path="register" element={<AdminRegister />} />
            <Route path="register-user" element={<RegisterUser />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="admin/pet-profiles" element={<AdminPetProfiles />} />
            <Route path="admin-schedule" element={<AdminSchedule />} />
            <Route path="admin-settings" element={<AdminSettings />} />
            <Route path="admin-view-users" element={<ViewUsers />} />
            <Route path="admin-view-users-pets/:id" element={<ViewUsersPets />} />
            <Route path="admin-view-users-pet/:id" element={<ViewPet />} />
            <Route path="admin-view-users-pet/:id" element={<ViewPet />} />
            <Route path="user-select-type" element={<SelectType />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById("root"));
  registerServiceWorker();