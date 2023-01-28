import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminRegister from "./pages/Admin/AdminRegister";
import RegisterUser from "./pages/Admin/RegisterUser";
import RegisterPet from "./pages/Admin/RegisterPet";
import AdminPetProfiles from "./pages/Admin/AdminPetProfiles";
import AdminSchedule from "./pages/Admin/AdminSchedule";
import AdminSettings from "./pages/Admin/AdminSettings";

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="register" element={<AdminRegister />} />
            <Route path="register-user" element={<RegisterUser />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="register-pet" element={<RegisterPet />} />
            <Route path="admin/pet-profiles" element={<AdminPetProfiles />} />
            <Route path="admin-schedule" element={<AdminSchedule />} />
            <Route path="admin-settings" element={<AdminSettings />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));