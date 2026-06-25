import React, { useState } from 'react';
import './Global.css';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import TextoColapsable from '../components/TextoColapsable';

function Home() {
  const [expandidoIndex, setExpandidoIndex] = useState(null);

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
    }
  ];

  return (
    <div>

      {/* HERO */}

      <div className="image-overlay-container">
        <video className="background-video" autoPlay muted loop playsInline>
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        {/* LOGO CENTRADO SOBRE EL VIDEO */}
        <img src="/img/logo 1.svg" alt="Logo" className="hero-centered-logo" />
      </div>

      {/* Bienvenidos */}
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: 'var(--white)' }}>
          Bienvenidos
        </h2>
      </div>

      {/* Galería */}
      <div className="container-gallery-wrapper">
        {/* DESKTOP → grilla */}
        <div className="gallery-desktop">
          {["021.jpg", "nueva1.jpg", "04.jpg", "nueva2.jpg", "015.jpg"].map((img, i) => (
            <div className="popup" key={i}>
              <img src={`/img/galeria/${img}`} alt={`Galería ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* MOBILE → Swiper */}
        <div className="gallery-mobile">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 3500 }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            navigation
          >
            {["021.jpg", "nueva1.jpg", "04.jpg", "nueva2.jpg", "015.jpg"].map((img, i) => (
              <SwiperSlide key={i}>
                <div className="popup">
                  <img src={`/img/galeria/${img}`} alt={`Galería ${i + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


      {/* SERVICIOS */}
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: 'var(--white)' }}>
          Servicios
        </h2>

        <div className="row">
          {/* CARD 1 */}
          <div className="col-md-6 mb-4">
            <div className="card custom-card h-100">
              <img src="/img/07.jpg" className="card-img-top" alt="Masaje Tuina" />
              <div className="card-body">
                <h5 className="card-title">Sesiones Integrales</h5>
                <TextoColapsable>
  <p className="mb-2">
   Te ayudo a mejorar tu calidad de vida mediante la Medicina Tradicional China.
En nuestras sesiones vamos a combinar el Masaje TuiNa con otros métodos de tratamiento como la Ventosa Terapia y la Acupuntura, para tratar tanto dolores físicos como desequilibrios corporales, emocionales y energéticos.
Al promover una buena la circulación del Qi y la Sangre liberamos bloqueos energéticos, tensiones y contracturas.
  </p>

  <p className="mb-0">
    Este masaje es efectivo tanto para dolores físicos como para desequilibrios emocionales y energéticos.
  </p>
</TextoColapsable>
                <a href="/turnos" className="btn btn-primary">
                  Reservar turno
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          {/*<div className="col-md-3 mb-4"> 
            <div className="card custom-card h-100">
              <img src="/img/jing2.png" className="card-img-top" alt="Curso online" />
              <div className="card-body">
                <h5 className="card-title">REPROGRAMACIÓN SEXUAL: CÓDIGO JING</h5>
                <TextoColapsable>
  <p>
    El ebook <strong>PRÁCTICO</strong> para optimizar tu energía sexual, tu vitalidad y longevidad.
  </p>

  <p>
    Domina tu recurso biológico más valioso. Este manual técnico incorpora algunas técnicas milenarias de la Medicina Tradicional China al lenguaje moderno...
  </p>

  <p>
    Deja de perder vitalidad. Empieza a enfocarte.
  </p>

  <p className="fw-bold mt-3">Lo que vas a aprender:</p>

  <ul>
    <li><strong>Protocolo de Autocontrol:</strong> Técnicas para dominar tu mente...</li>
    <li><strong>Gestión de tu energía:</strong> Cómo recircular tu energía...</li>
    <li><strong>Actualización Biológica:</strong> Rutinas de respiración...</li>
  </ul>
</TextoColapsable>
                <a href="/Cursos" className="btn btn-primary">
                  Ver más
                </a>
              </div>
            </div>
          </div> */}

          {/* CARD 3 */}
         {/* <div className="col-md-3 mb-4">
            <div className="card custom-card h-100">
              <img src="/img/1.jpg" className="card-img-top" alt="Renueva tu ser" />
              <div className="card-body">
                <h5 className="card-title">Renueva tu ser</h5>
               <TextoColapsable>
  <p className="mb-2">
    Sesiones personalizadas en línea para ayudarte a encontrar soluciones profundas y auténticas a tus desafíos personales, físicos, emocionales o espirituales.
  </p>

  <p className="mb-2">
    Integro herramientas de la Medicina China, meditación y Yoga terapéutico, para acompañarte en un proceso de autoconocimiento y transformación interior.
  </p>

  <p className="mb-0">
    Estas sesiones son un espacio de escucha, guía y reconexión. <strong>Empieza a SER el cambio que estás buscando.</strong>
  </p>
</TextoColapsable>
                <a href="/Cursos" className="btn btn-primary">
                  Agenda tu Sesión
                </a>
              </div>
            </div>
          </div>*/} 
          {/* CARD 4 */}
          <div className="col-md-6 mb-4">
            <div className="card custom-card h-100">
              <img src="/img/03.jpg" className="card-img-top" alt="Curso online" />
              <div className="card-body">
                <h5 className="card-title">Capacitacion online Tuina</h5>
                <TextoColapsable>
  <p className="mb-2">
    Descubrí la eficacia del <strong>TuiNa</strong> e incorporá estas técnicas profesionales terapéuticas para aplicar a tus sesiones o comenzar a trabajar como masoterapeuta.
  </p>

  <p className="mb-2">
    Vas a aprender cómo estimular el flujo de Qi, aliviar dolencias físicas, tratar desequilibrios internos y acompañar procesos de sanación natural.
  </p>

  <p className="mb-0">
    Ideal para terapeutas, estudiantes y personas que deseen sumar una herramienta transformadora a su camino profesional o personal.
  </p>
</TextoColapsable>
                <a href="/Cursos" className="btn btn-primary">
                  Ver más
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TESTIMONIOS */}
      <div className="testimonios-section py-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          spaceBetween={30}
          slidesPerView={1}
        >
          {testimonios.map((t, i) => {
            const expandido = expandidoIndex === i;
            const resumido = t.texto.length > 250 ? t.texto.slice(0, 250) + "..." : t.texto;

            return (
              <SwiperSlide key={i}>
                <div className="testimonio text-center">
                  <img src={t.avatar} className="avatar mb-3" alt={t.nombre} />

                  <p>{expandido ? t.texto : resumido}</p>

                  {t.texto.length > 250 && (
                    <button
                      className="btn btn-link text-white"
                      onClick={() => setExpandidoIndex(expandido ? null : i)}
                    >
                      {expandido ? "Ver menos" : "Ver más"}
                    </button>
                  )}

                  <div className="estrellas">
                    {"★".repeat(t.estrellas)}{"☆".repeat(5 - t.estrellas)}
                  </div>

                  <p style={{ color: 'var(--white)' }}>– {t.nombre}</p>
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