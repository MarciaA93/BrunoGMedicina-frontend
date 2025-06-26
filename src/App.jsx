import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Turnero from './pages/Turnero';
import About from './pages/About';
import Login from './pages/admin/Login';
import AdminPanel from './pages/admin/AdminPanel'; 
import Cursos from './pages/Cursos'; 
import './App.css';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turnos" element={<Turnero />} />
          <Route path="/About" element={<About />} />
           <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<AdminPanel />} />
         <Route path="/Cursos" element={<Cursos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

