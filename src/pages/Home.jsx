import React from 'react';
import './Home.css';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

function Home() {
  const [expandidoIndex, setExpandidoIndex] = useState(null); // para manejar qué testimonio se expande

  

const testimonios = [
  {
    nombre: "Vicenta Diaz",
    texto: `Recientemente visité este centro de masajes ubicado en Godoy Cruz, Mendoza.
Quedé completamente satisfecha con la experiencia. El establecimiento cuenta con una ambientación exquisita que crea un ambiente cálido y acogedor, ideal para la relajación desde el momento en que ingresas.
Durante mi sesión, experimenté el masaje tuina y la aplicación de ventosas. Debo destacar la profesionalidad de Bruno, quien realizó los tratamientos con gran conocimiento y destreza. En todo momento me sentí cómoda.
La relación precio/calidad es excelente.
Lo que más aprecié fue la combinación perfecta entre la efectividad del tratamiento y el ambiente propicio para la relajación. Las técnicas aplicadas no solo ayudaron a liberar tensiones musculares sino también a equilibrar la energía del cuerpo según los principios de la medicina china tradicional.
Sin duda, este centro es muy recomendable ya sea que sufras de dolores específicos o simplemente busques un momento de bienestar.`,

    estrellas: 5,
    avatar: "/img/reseña1.png"
  },
  {
    nombre: "Maria Belen Pascual",
    texto: "Muy buena experiencia, todo bien pensado y ordenado para que uno se sienta cómodo. Bruno trabaja muy bien, con mucho conocimiento y también respeto en el cuerpo del otro, los masajes y las ventosas ayudan a soltar tensiones y a sentirse mejor, incluso si vas con algún dolor. Voy cada 15 días y para mí las sesiones de una hora y media son el tiempo justo, siempre siento que mi cuerpo lo agradece porque salgo totalmente relajada y renovada. Lo súper recomiendo!!",
    estrellas: 5,
    avatar: "/img/reseña2.png"
  },
  {
    nombre: "Lucia Dibarrat",
    texto: "Bruno brinda un excelente servicio, combina técnicas de masajes con ventosas que ayudan rápidamente a aflojar la contractura y relajar tensión muscular. El espacio es accesible y acondicionado para mayor comodidad del cuerpo. Buena temperatura y aromas relajantes.",
    estrellas: 5,
    avatar: "/img/reseña3.png"
  },
  {
    nombre: "Cecilia Rigui",
    texto: "Excelente experiencia con Bruno, Su enfoque terapéutico y habilidad para personalizar cada sesión me han ayudado significativamente a mejorar mi calidad de sueño. Después de varias sesiones, he notado una gran diferencia en mi descanso y bienestar general. Lo recomiendo ampliamente a aquellos que buscan aliviar problemas de sueño y mejorar su salud en general. Su profesionalismo y dedicación son notables. ¡No dudes en contactarlo si buscas una solución natural y efectiva para tus problemas de sueño entre otros.",
    estrellas: 5,
    avatar: "/img/reseña4.png"
    
  },
   {
    nombre: "Julieta Suarez",
    texto: "Que decirte que no te han dicho en otros comentarios... me sentí sobre todo escuchada, pocos terapeutas te escuchan antes y después de las terapias yo lo valoro mucho y me sacaste evidentemente un gran pesos de mis hombros. Gracias  ✨️",
    estrellas: 5,
    avatar: "/img/reseña5.png"
    
  },

];

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
        <h2 className="text-center text-dark mb-4">BIENVENIDOS</h2>
        
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
  <h2 className="text-center text-dark mb-4">SERVICIOS</h2>
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
          <h5>Técnicas Profesionales de</h5>
          <h5>la Medicina China</h5>
          <p className="card-text">
          Descubrí la eficacia del  TuiNa e incorporá estas técnicas profesionales terapéuticas para aplicar a tus sesiones o comenzar a trabajar como masoterapeuta.
Vas a aprender cómo estimular el flujo de Qi, aliviar dolencias físicas, tratar desequilibrios internos y acompañar procesos de sanación natural.
Ideal para terapeutas, estudiantes y personas que deseen sumar una herramienta transformadora a su camino profesional o personal.
          </p>
          <a href="/Cursos" className="btn btn-secondary btn-lg">VER MÁS</a>
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
          <a href="/Cursos" className="btn btn-secondary btn-lg">AGENDA TU SESIÓN</a>
        </div>
      </div>
    </div>
  </div>
</div>




      <div className="testimonios-section py-5">
        
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop={true}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
        >
          {testimonios.map((t, i) => {
            const estaExpandido = expandidoIndex === i;
            const textoCorto = t.texto.length > 250 ? t.texto.slice(0, 250) + '...' : t.texto;
            return (
              <SwiperSlide key={i}>
                <div className="testimonio text-center text-dark">
                  <img src={t.avatar} alt={t.nombre} className="avatar mb-3" />
                  <p className="texto">{estaExpandido ? t.texto : textoCorto}</p>
                  {t.texto.length > 250 && (
                    <button
                      className="btn btn-link btn-sm text-light"
                      onClick={() =>
                        setExpandidoIndex(estaExpandido ? null : i)
                      }
                    >
                      {estaExpandido ? 'Ver menos' : 'Ver más'}
                    </button>
                  )}
                  <div className="estrellas">
                    {"★".repeat(t.estrellas)}{"☆".repeat(5 - t.estrellas)}
                  </div>
                  <p className="nombre text-dark">– {t.nombre}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

<Footer />
    </div>
  );
}

export default Home;
