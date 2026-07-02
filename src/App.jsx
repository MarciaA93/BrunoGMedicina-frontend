import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Turnero from './pages/Turnero';
import About from './pages/About';
import Login from './pages/admin/Login';
import AdminPanel from './pages/admin/AdminPanel'; 
import Cursos from './pages/Cursos'; 
import './App.css';
import Success from './pages/Success';
import ScrollToTopButton from "./components/ScrollToTopButton";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const adminUser = localStorage.getItem("adminUser");

  return adminUser
    ? children
    : <Navigate to="/login" replace />;
}


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turnos" element={<Turnero />} />
          <Route path="/About" element={<About />} />
           <Route path="/login" element={<Login />} />
         <Route path="/admin"  element={
    <PrivateRoute>
      <AdminPanel />
    </PrivateRoute>
  } />
         <Route path="/Cursos" element={<Cursos />} />
          <Route path="/success" element={<Success />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

