import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="/img/022.jpg"
            alt="Spa de medicina china"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '400px' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">Sobre Mi</h1>
          <p className="lead">
            Hola mi nombre es Bruno. Soy terapeuta especializado en masoterapia con formación en Medicina China y Masaje TuiNa. Acompaño a personas en su camino de bienestar físico, energético y emocional a través de sesiones personalizadas que integran sabiduría oriental y occidental. Además, brindo cursos de masaje pensados para quienes quieren aprender a contribuir a la mejora de la calidad de vida de otras personas, desde un enfoque consciente y profesional.
          </p>
        </div>
      </div>
     
    </div>
  );
};

export default About;
