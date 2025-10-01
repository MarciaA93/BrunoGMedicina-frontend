import React, { useState, useEffect } from 'react';
import './Cursos.css';
import { Modal, Button, Form } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MERCADOPAGO_API = `${API_BASE_URL}/api/mercadopago/create_course_preference`;

const Cursos = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [formValid, setFormValid] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [precios, setPrecios] = useState([]);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://www.paypal.com/sdk/js?client-id=AcnkQsE54OtQGTt0dG8ucQh79wqIm4IXMzYV1JWUGYyxnFGM2lBBg6akcqjBepoHskhEtGtFM74oGs2p&currency=USD';
  //   script.async = true;
  //   script.onload = () => {
  //     console.log('PayPal SDK cargado correctamente');
  //   };
  //   script.onerror = () => {
  //     console.error('Error al cargar el SDK de PayPal');
  //   };
  //   document.body.appendChild(script);
  // }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/precios-cursos`)
      .then(res => res.json())
      .then(data => setPrecios(data));
  }, []);

  // Validar campos
  useEffect(() => {
    const { nombre, email } = formData;
    setFormValid(nombre.trim() !== '' && email.includes('@'));
  }, [formData]);

  // // Renderizar botón de PayPal (Comentado)
  // useEffect(() => {
  //   if (formValid && window.paypal && productoSeleccionado) {
  //     // Lógica de PayPal aquí...
  //   }
  // }, [formValid, productoSeleccionado, formData.email, formData.nombre]);

  // Renderizar botón de Mercado Pago
  useEffect(() => {
    if (formValid && productoSeleccionado) {
      const cursoElegido = precios.find(p =>
        productoSeleccionado === 'curso'
          ? p.nombreCurso.includes('TuiNa')
          : p.nombreCurso.includes('Renueva'));

      const precio = cursoElegido?.price_ars || 0;
      const descripcion = productoSeleccionado === 'curso'
        ? 'Curso online: Masaje TuiNa'
        : 'Sesión 1 a 1: Renueva tu SER';

      const container = document.getElementById('mercadopago-button-container');
      if (container) container.innerHTML = '';

      if (container) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-lg w-100';
        btn.textContent = 'Pagar con Mercado Pago 🇦🇷';
        btn.onclick = async () => {
          try {
            const res = await fetch(MERCADOPAGO_API, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: descripcion,
                unit_price: precio,
                quantity: 1,
                nombre: formData.nombre,
                email: formData.email,
              }),
            });
            const data = await res.json();
            if (!data.init_point) throw new Error('No se recibió init_point');

            window.location.href = data.init_point;
          } catch (err) {
            console.error('❌ Error en Mercado Pago:', err);
            alert('Hubo un problema con Mercado Pago.');
          }
        };

        container.appendChild(btn);
      }
    }
  }, [formValid, productoSeleccionado, formData.email, formData.nombre, precios]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleShowModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nombre: '', email: '' });
    setProductoSeleccionado('');
    setCompraExitosa(false);
  };

  const getPrecio = (nombreCurso) => {
    const curso = precios.find(p => p.nombreCurso === nombreCurso);
    return curso ? curso.price_ars : '---';
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Curso Digitopuntura */}
        <div className="col-md-6">
          <div className="card custom-card text-light border-0 shadow rounded-4 h-100">
            <div className="image-container">
              <img
                src="/img/012.jpg"
                className="card-img-top rounded-top-4 zoom-img"
                alt="Curso"
              />
            </div>
            <div className="card-body">
              <h4 className="card-title">CAPACITACION MASAJE TUINA: </h4>
              <h5>TÉCNICAS PROFESIONALES DE LA MEDICINA CHINA</h5>
              <p className="card-text">
                El masaje TuiNa es una rama terapéutica de la Medicina Tradicional China que consta de varias técnicas utilizadas para estimular el flujo de Qi y sangre, liberar bloqueos y contracturas restaurar el equilibrio del cuerpo. Se aplica tanto en dolores físicos como musculares, como en desequilibrios internos. Es uno de los pilares de la medicina china, junto con la acupuntura, la fitoterapia y el Qi Gong.
              </p>
              <div className="mb-3">
                <p className="fw-bold  mb-1">✨ Pack completo: 5 videos + PDF</p>
                <p className="text-success fw-bold mb-1" style={{ fontSize: '1.3rem' }}>
                  Precio: ${getPrecio('Curso de Masaje TuiNa')} ARS
                </p>
              </div>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => handleShowModal('curso')}
              >
                COMPRAR
              </button>
            </div>
          </div>
        </div>

        {/* Sesión 1 a 1 */}
        <div className="col-md-6">
          <div className="card custom-card bg-dark text-light border-0 shadow rounded-4 h-100">
            <div className="image-container">
              <img
                src="/img/1.jpg"
                className="card-img-top rounded-top-4 zoom-img"
                alt="Sesión"
              />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h4 className="card-title">RENUEVA TU SER</h4>
                <p className="card-text">
                  Consultas personalizadas en línea para ayudarte a encontrar soluciones específicas a tus afecciones. En estas sesiones, también, usaremos técnicas de Medicina China, Yoga y Meditación, que te acompañarán en un viaje de autoconocimiento y crecimiento personal/espiritual.
                </p>
                <hr />
                <h5>
                  <strong>Precio:</strong> ${getPrecio('Renueva tu SER - Sesión 1 a 1')} ARS
                </h5>
              </div>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => handleShowModal('sesion')}
              >
                RESERVAR Y PAGAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header closeButton className="custom-popup">
          <Modal.Title>
            {productoSeleccionado === 'curso'
              ? 'Comprar Curso'
              : 'Reservar Sesión 1 a 1'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-popup">
          {compraExitosa ? (
            <div className="text-center py-4">
              <h2 className="text-success mb-3">✅ ¡Compra Exitosa!</h2>
              <p className="lead">Gracias por tu compra, te enviamos un email con los detalles. 🌸</p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@email.com"
                />
              </Form.Group>
              {formValid ? (
                <div id="mercadopago-button-container" className="mb-2" />
              ) : (
                <p className="text-secondary">Completá los datos para continuar con el pago.</p>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cursos;