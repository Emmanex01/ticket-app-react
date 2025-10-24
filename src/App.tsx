import { Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/tickets" element={<Tickets />}/>
    </Routes>
  );
}

