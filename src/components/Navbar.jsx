import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const checkLogin = () => {
    const user = localStorage.getItem('adminUser');
    setIsLoggedIn(!!user);
  };

  checkLogin();

  // Escuchamos nuestro evento personalizado "loginChanged"
  window.addEventListener('loginChanged', checkLogin);

  return () => {
    window.removeEventListener('loginChanged', checkLogin);
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Cierra el menú hamburguesa si está abierto
  const handleNavClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={handleNavClick}>
          BRUNO GRATTONI
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavClick}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleNavClick}>Sobre mí</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/turnos" onClick={handleNavClick}>Turnos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cursos" onClick={handleNavClick}>Cursos</Link>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleNavClick}>Administrador</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-warning" to="/admin" onClick={handleNavClick}>
                    Panel de administración
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
