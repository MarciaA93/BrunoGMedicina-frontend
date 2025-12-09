import React from 'react';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  return (
    <div className="container py-5">

  {/* TÍTULO */}
  <h1 className="text-center about-title">Sobre Mí</h1>

  <div className="row align-items-center">

    {/* COLUMNA IZQUIERDA */}
    <div className="col-md-6 mb-4 mb-md-0">
      <div className="collage-grid">
        <img src="/img/022.jpg" alt="1" className="collage-img" />
        <img src="/img/03.jpg" alt="2" className="collage-img" />
        <img src="/img/07.jpg" alt="3" className="collage-img collage-img-central" />
        <img src="/img/09.jpg" alt="4" className="collage-img" />
        <img src="/img/012.jpg" alt="5" className="collage-img" />
      </div>
    </div>

    {/* COLUMNA DERECHA */}
    <div className="col-md-6">

      <p className="about-text">
        Hola, mi nombre es Bruno. Soy terapeuta especializado en masoterapia con formación en Medicina China y Masaje TuiNa. Acompaño a personas en su camino de bienestar físico, energético y emocional a través de sesiones personalizadas que integran sabiduría oriental y occidental. Además, brindo cursos de masaje pensados para quienes quieren aprender a contribuir a la mejora de la calidad de vida de otras personas, desde un enfoque consciente y profesional.
      </p>

      <hr style={{ borderColor: "#958BBD" }} />

      <p className="about-text">
        <strong>📧 Correo:</strong><br />
        <a className="about-link" href="mailto:brunomedicinachina@gmail.com">
          brunomedicinachina@gmail.com
        </a>
      </p>

      <p className="about-text">
        <strong>📱 WhatsApp de contacto:</strong><br />
        <a className="about-link" href="https://wa.me/5492617242768" target="_blank" rel="noopener noreferrer">
          +5492617242768
        </a>
      </p>

      <p className="about-text">
        <strong>📍 Ubicación:</strong><br />
        Paraná 1132, GC, MDZ.
      </p>

      <div className="map-embed" style={{ height: '200px', width: '100%' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.146793529292!2d-68.85989312456074!3d-32.92071967057914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0978be30846f%3A0x9096178d41c0cbba!2sParan%C3%A1%201132%2C%20M5504%20Godoy%20Cruz%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1751741164489!5m2!1ses!2sar"
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</div>

  );
};

export default About;
