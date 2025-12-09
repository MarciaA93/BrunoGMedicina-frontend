import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
   <footer className="footer-section py-4 mt-5">
  <div className="container text-center">

    {/* Redes sociales */}
    <div className="footer-social mb-3">
      <a
        href="https://www.instagram.com/bruno_medicinachina/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={26} />
      </a>

      <a
        href="https://wa.me/5492617242768"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>

    {/* Texto */}
    <p className="footer-text">
      © {new Date().getFullYear()} Bruno Grattoni | Medicina China
    </p>

    <p className="footer-author">
      Diseñado por{" "}
      <a
        href="https://www.instagram.com/mmcode.ok/"
        target="_blank"
        rel="noopener noreferrer"
      >
        MMcode
      </a>
    </p>

  </div>
</footer>

  );
};

export default Footer;

