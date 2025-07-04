import React from 'react';
import Footer from '../components/Footer';
import './About.css'; // Si ponés ahí los estilos para collage-img

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        
        {/* COLUMNA IZQUIERDA: Collage */}
        <div className="col-md-6">
          <div className="d-grid gap-3" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
            <img src="/img/022.jpg" alt="1" className="collage-img" />
            <img src="/img/03.jpg" alt="2" className="collage-img" />
            <img src="/img/07.jpg" alt="3" className="collage-img collage-img-central" style={{ gridColumn: 'span 2' }} />
            <img src="/img/09.jpg" alt="4" className="collage-img" />
            <img src="/img/012.jpg" alt="5" className="collage-img" />
          </div>
        </div>

        {/* COLUMNA DERECHA: Texto */}
        <div className="col-md-6 text-dark">
          <h1 className="mb-4">SOBRE MI</h1>
          <p className="lead">
            Hola, mi nombre es Bruno. Soy terapeuta especializado en masoterapia con formación en Medicina China y Masaje TuiNa. Acompaño a personas en su camino de bienestar físico, energético y emocional a través de sesiones personalizadas que integran sabiduría oriental y occidental. Además, brindo cursos de masaje pensados para quienes quieren aprender a contribuir a la mejora de la calidad de vida de otras personas, desde un enfoque consciente y profesional.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
