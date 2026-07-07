import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./modules/common/components/Navbar";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";

import OwnerHome from "./modules/user/owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

import AdminHome from "./modules/admin/AdminHome";

import AddProperty from "./modules/user/owner/AddProperty";
import MyProperties from "./modules/user/owner/MyProperties";
import OwnerBookings from "./modules/user/owner/OwnerBookings";

import MyBookings from "./modules/user/renter/MyBookings";

import AllProperties from "./modules/user/AllProperties";
import EditProperty from "./modules/user/owner/EditProperty";

function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/owner" element={<OwnerHome />} />

        <Route path="/renter" element={<RenterHome />} />

        <Route path="/admin" element={<AdminHome />} />

        <Route path="/all-properties" element={<AllProperties />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/my-properties" element={<MyProperties />} />

        <Route path="/owner-bookings" element={<OwnerBookings />} />

        <Route path="/add-property" element={<AddProperty />} />

        <Route path="/owner/add-property" element={<AddProperty />} />

        <Route path="/edit-property/:id" element={<EditProperty />} />

      </Routes>

    </>

  );

}

export default App;