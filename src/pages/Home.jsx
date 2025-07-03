import React from 'react';
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
     <div className="image-overlay-container">
  <video
    className="background-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/video/video1.mp4" type="video/mp4" ></source>
    Tu navegador no soporta el video HTML5.
  </video>
  <div className="overlay"></div>
  <h2 className="overlay-text">MEDICINA TRADICIONAL CHINA</h2>
</div>

      <div className="container py-5">
        <h2 className="text-center mb-4">BIENVENIDOS</h2>
        
      </div>
      
      <div className="container-gallery">
  <div className="popup popup-1">
    <img
      className="img-responsive"
      alt="Galería 1"
      src="/img/galeria/021.jpg"
    />
  </div>
  <div className="popup popup-2">
    <img
      className="img-responsive"
      alt="Galería 2"
      src="/img/galeria/nueva1.jpg"
    />
  </div>
  <div className="popup popup-3">
    <img
      className="img-responsive"
      alt="Galería 3"
      src="/img/galeria/04.jpg"
    />
  </div>
  <div className="popup popup-4">
    <img
      className="img-responsive"
      alt="Galería 4"
      src="/img/galeria/nueva2.jpg"
    />
  </div>
  <div className="popup popup-5">
    <img
      className="img-responsive"
      alt="Galería 5"
      src="/img/galeria/015.jpg"
    />
  </div>
</div>
      <div className="container py-5">
  <h2 className="text-center mb-4">SERVICIOS</h2>
  <div className="row">
    <div className="col-md-4 mb-4">
       <div className="card custom-card h-100 shadow-sm">
        <img
          src="/img/07.jpg"
          className="card-img-top"
          alt="Masajes terapéuticos"
        />
        <div className="card-body">
          <h5 className="card-title">MASAJE TUINA</h5>
          <p className="card-text">
           El masaje TuiNa es una rama terapéutica  de la Medicina Tradicional China, diseñada para restablecer el equilibrio del cuerpo y la mente. A través de maniobras específicas se estimula la circulación del Qi y la sangre, se liberan bloqueos energéticos, tensiones y contracturas.
Este masaje es efectivo tanto para dolores físicos como para desequilibrios emocionales y energéticos. 
          </p>
          <a href="/turnos" className="btn btn-secondary btn-lg">RESERVAR TURNO</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
        <div className="card custom-card h-100 shadow-sm">
        <img
          src="/img/03.jpg"
          className="card-img-top"
          alt="Curso de masaje"
        />
        <div className="card-body">
          <h5 className="card-title">CURSO ONLINE TUINA: </h5>
          <h4>Técnicas Profesionales de</h4>
          <h4>la Medicina China</h4>
          <p className="card-text">
          Descubrí la eficacia del  TuiNa e incorporá estas técnicas profesionales terapéuticas para aplicar a tus sesiones o comenzar a trabajar como masoterapeuta.
Vas a aprender cómo estimular el flujo de Qi, aliviar dolencias físicas, tratar desequilibrios internos y acompañar procesos de sanación natural.
Ideal para terapeutas, estudiantes y personas que deseen sumar una herramienta transformadora a su camino profesional o personal.
          </p>
          <a href="/Cursos" className="btn btn-secondary btn-lg">VER MAS</a>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
        <div className="card custom-card h-100 shadow-sm">
        <img
          src="/img/1.jpg"
          className="card-img-top"
          alt="Nuevo servicio"
        />
        <div className="card-body">
          <h5 className="card-title">RENUEVA TU SER</h5>
          <p className="card-text">
           Sesiones personalizadas en línea para ayudarte a encontrar soluciones profundas y auténticas a tus desafíos personales, físicos, emocionales o espirituales.
Integro herramientas de la Medicina China, meditación y Yoga terapéutico, para acompañarte en un proceso de autoconocimiento y transformación interior.
Estas sesiones son un espacio de escucha, guía y reconexión. Empieza a SER el cambio que estás buscando.
          </p>
          <a href="/Cursos" className="btn btn-secondary btn-lg">AGENDA TU SESION</a>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
    </div>
  );
}

export default Home;
