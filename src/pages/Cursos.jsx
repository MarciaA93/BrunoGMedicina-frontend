import React, { useState, useEffect } from 'react';

import './Cursos.css';
import { Modal, Button, Form } from 'react-bootstrap';


const Cursos = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [formValid, setFormValid] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [compraExitosa, setCompraExitosa] = useState(false);


useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.paypal.com/sdk/js?client-id=AcnkQsE54OtQGTt0dG8ucQh79wqIm4IXMzYV1JWUGYyxnFGM2lBBg6akcqjBepoHskhEtGtFM74oGs2p&currency=USD';
  script.async = true;
  script.onload = () => {
    console.log('PayPal SDK cargado correctamente');
  };
  script.onerror = () => {
    console.error('Error al cargar el SDK de PayPal');
  };
  document.body.appendChild(script);
}, []);





  // Validar campos
  useEffect(() => {
    const { nombre, email } = formData;
    setFormValid(nombre.trim() !== '' && email.includes('@'));
  }, [formData]);

  // Renderizar botón de PayPal según producto seleccionado
  useEffect(() => {
    if (formValid && window.paypal && productoSeleccionado) {
      const precio = productoSeleccionado === 'curso' ? '138.00' : '67.00';
      const descripcion = productoSeleccionado === 'curso'
        ? 'Curso online: Masaje TuiNa'
        : 'Sesión 1 a 1: Renueva tu SER';

      // Limpiar contenedor antes de renderizar (evita múltiples botones)
      document.getElementById('paypal-button-container').innerHTML = '';

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: precio },
              description: descripcion,
            }],
          });
        },

        
  onApprove: (data, actions) => {
  return actions.order.capture().then(async (details) => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL; 
       console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${API_BASE}/api/guardar-compra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          producto: productoSeleccionado,
          paypalDetails: details,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la compra en el servidor');
      }

      setCompraExitosa(true);
      // NO cerrar el modal todavía:
setTimeout(() => {
  handleCloseModal();
}, 3000); // Cierra automáticamente después de 3 segundos
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('La compra fue realizada, pero ocurrió un problema al guardar los datos. Por favor contáctanos.');
    }
  });
},

      }).render('#paypal-button-container');
    }
 }, [formValid, productoSeleccionado, formData.email, formData.nombre]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseModal = () => {
  setShowModal(false);
  setFormData({ nombre: '', email: '' });
  setProductoSeleccionado('');
  setCompraExitosa(false);
};

  return (
    <div className="container my-5">
      <div className="row g-4">

        {/* Curso Digitopuntura */}
        <div className="col-md-6">
          <div className="card custom-card bg-dark text-light border-0 shadow rounded-4 h-100">
            <div className="image-container">
              <img
                src="/img/012.jpg"
                className="card-img-top rounded-top-4 zoom-img"
                alt="Curso"
              />
            </div>
            <div className="card-body">
              <h4 className="card-title">Curso Masaje TuiNa: Técnicas Profesionales de la Medicina China</h4>
              <p className="card-text">
               El masaje TuiNa es una rama terapéutica de la Medicina Tradicional China que consta de varias técnicas utilizadas para estimular el flujo de Qi y sangre, liberar bloqueos y contracturas restaurar el equilibrio del cuerpo. Se aplica tanto en dolores  físicos como musculares, como en desequilibrios internos. Es uno de los pilares de la medicina china, junto con la acupuntura, la fitoterapia y el Qi Gong.
              </p>
              <div className="mb-3">
                <p className="fw-bold text-info mb-1">✨ Pack completo: 5 videos + PDF</p>
                <p className="text-muted mb-1" style={{ textDecoration: 'line-through' }}>Precio regular: 276 USD</p>
                <p className="text-success fw-bold mb-1" style={{ fontSize: '1.3rem' }}>Ahora: 138 USD</p>
                <span className="badge bg-danger text-light">Promo 50% OFF – Solo para las primeras 5 compras</span>
              </div>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  setProductoSeleccionado('curso');
                  setShowModal(true);
                }}
              >
                Comprar
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
                
                <p><strong>Precio:</strong> 67 USD</p>
              </div>
              <button
                className="btn btn-light mt-3 align-self-start"
                onClick={() => {
                  setProductoSeleccionado('sesion');
                  setShowModal(true);
                }}
              >
                Reservar y pagar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>
            {productoSeleccionado === 'curso'
              ? 'Comprar Curso'
              : 'Reservar Sesión 1 a 1'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
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
        <div id="paypal-button-container" className="mb-2" />
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
