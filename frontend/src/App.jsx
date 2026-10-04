import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEvent from "./pages/admin/AddEvent";
import EditEvent from "./pages/admin/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
        <Route path="/admin/add-event"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          } />
        <Route path="/admin/edit-event/:id"
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;