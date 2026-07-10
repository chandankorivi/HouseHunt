import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Toast from "./components/Toast";

import Navbar from "./modules/common/components/Navbar";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";
import About from "./modules/common/About";
import Contact from "./modules/common/Contact";

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
    <AuthProvider>
      <Toast />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-properties" element={<AllProperties />} />

        {/* Protected – Owner */}
        <Route path="/owner" element={
          <ProtectedRoute roles={["owner"]}>
            <OwnerHome />
          </ProtectedRoute>
        } />
        <Route path="/my-properties" element={
          <ProtectedRoute roles={["owner"]}>
            <MyProperties />
          </ProtectedRoute>
        } />
        <Route path="/owner-bookings" element={
          <ProtectedRoute roles={["owner"]}>
            <OwnerBookings />
          </ProtectedRoute>
        } />
        <Route path="/add-property" element={
          <ProtectedRoute roles={["owner"]}>
            <AddProperty />
          </ProtectedRoute>
        } />
        <Route path="/owner/add-property" element={
          <ProtectedRoute roles={["owner"]}>
            <AddProperty />
          </ProtectedRoute>
        } />
        <Route path="/edit-property/:id" element={
          <ProtectedRoute roles={["owner"]}>
            <EditProperty />
          </ProtectedRoute>
        } />

        {/* Protected – Renter */}
        <Route path="/renter" element={
          <ProtectedRoute roles={["user"]}>
            <RenterHome />
          </ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
          <ProtectedRoute roles={["user"]}>
            <MyBookings />
          </ProtectedRoute>
        } />

        {/* Protected – Admin */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}>
            <AdminHome />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;