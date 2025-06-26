import React from 'react';
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <div className="image-overlay-container">
  <img src="/img/03.jpg" alt="Fondo" className="background-image" />
  <div className="overlay"></div>
  <h2 className="overlay-text">MEDICINA CHINA-MASAJE TUINA</h2>
  
</div>

      <div className="container py-5">
        <h2 className="text-center mb-4">Bienvenidos</h2>
        <p className="lead text-center">
          Sumergite en una experiencia de relajación y armonía con nuestros masajes terapéuticos.
        </p>
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
  <h2 className="text-center mb-4">Servicios</h2>
  <div className="row">
    <div className="col-md-4 mb-4">
       <div className="card custom-card h-100 shadow-sm">
        <img
          src="/img/07.jpg"
          className="card-img-top"
          alt="Masajes terapéuticos"
        />
        <div className="card-body">
          <h5 className="card-title">Masaje TuiNa</h5>
          <p className="card-text">
            El masaje TuiNa es una rama terapéutica de la Medicina Tradicional China que consta de varias técnicas utilizadas para estimular el flujo de Qi y sangre, liberar bloqueos y contracturas restaurar el equilibrio del cuerpo. Se aplica tanto en dolores  físicos como musculares, como en desequilibrios internos. Es uno de los pilares de la medicina china, junto con la acupuntura, la fitoterapia y el Qi Gong.
          </p>
          <a href="/turnos" className="btn btn-secondary btn-lg">Reservar turno</a>
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
          <h5 className="card-title">Curso Masaje TuiNa: Técnicas Profesionales de la Medicina China</h5>
          <p className="card-text">
           El masaje TuiNa es una rama terapéutica de la Medicina Tradicional China que consta de varias técnicas utilizadas para estimular el flujo de Qi y sangre, liberar bloqueos y contracturas restaurar el equilibrio del cuerpo. Se aplica tanto en dolores  físicos como musculares, como en desequilibrios internos. Es uno de los pilares de la medicina china, junto con la acupuntura, la fitoterapia y el Qi Gong.
          </p>
          <a href="/Cursos" className="btn btn-secondary btn-lg">Ver Más</a>
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
          <h5 className="card-title">Sesiones 1 a 1: Renueva tu SER</h5>
          <p className="card-text">
            Consultas personalizadas en línea para ayudarte a encontrar soluciones específicas a tus afecciones. En estas  sesiones, también, usaremos técnicas de Medicina China, Yoga y Meditación, que  te acompañarán en un viaje de autoconocimiento y crecimiento personal/espiritual. 
Comienza a SER el cambio.
          </p>
          <a href="/Cursos" className="btn btn-secondary btn-lg">Agenda tu sesion</a>
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
