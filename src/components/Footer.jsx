import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        {/* Redes sociales */}
        <div className="mb-2">
          <a
            href="https://www.facebook.com/tu_pagina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-3"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/bruno_medicinachina/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-3"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me/5491165315863"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-3"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
       
    

        {/* Texto de pie */}
        <p className="mb-1">© {new Date().getFullYear()} Bruno Grattoni | Medicina China</p>
        <p className="mb-0">Diseñado por MMcode</p>
      </div>
    </footer>
  );
};

export default Footer;

