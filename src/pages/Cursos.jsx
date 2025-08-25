import React, { useState, useEffect } from 'react';

import './Cursos.css';
import { Modal, Button, Form } from 'react-bootstrap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TURNOS_API = `${API_BASE_URL}/api/turnos`;
const MERCADOPAGO_API = `${API_BASE_URL}/api/mercadopago/create_preference`;


const Cursos = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [formValid, setFormValid] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [bloqueado] = useState(true); // ponelo en false cuando quieras habilitarlo


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

  // Renderizar botón de PayPal según producto seleccionado
 // Renderizar botón de PayPal según producto seleccionado
useEffect(() => {
  if (formValid && window.paypal && productoSeleccionado) {
    const cursoElegido = precios.find(p => 
      productoSeleccionado === 'curso' 
        ? p.nombreCurso.includes('TuiNa') 
        : p.nombreCurso.includes('Renueva')
    );

    const precio = cursoElegido?.price_usd || '0.00'; // USD para PayPal
    const descripcion = productoSeleccionado === 'curso'
      ? 'Curso online: Masaje TuiNa'
      : 'Sesión 1 a 1: Renueva tu SER';

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
            const response = await fetch(`${API_BASE_URL}/api/guardar-compra`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: formData.nombre,
                email: formData.email,
                producto: productoSeleccionado,
                paypalDetails: details,
              }),
            });

            if (!response.ok) throw new Error('Error al guardar la compra');

            setCompraExitosa(true);
            setTimeout(handleCloseModal, 3000);
          } catch (error) {
            console.error('Error al confirmar la compra:', error);
            alert('La compra fue realizada, pero ocurrió un problema al guardar los datos.');
          }
        });
      },
    }).render('#paypal-button-container');
  }
}, [formValid, productoSeleccionado, formData.email, formData.nombre]);

// Renderizar botón de Mercado Pago
useEffect(() => {
  if (formValid && productoSeleccionado) {
    const cursoElegido = precios.find(p =>
      productoSeleccionado === 'curso'
        ? p.nombreCurso.includes('TuiNa')
        : p.nombreCurso.includes('Renueva')
    );

    const precio = cursoElegido?.price_ars || 0; // ARS para Mercado Pago
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
              date: new Date().toISOString().split('T')[0],
              time: new Date().toLocaleTimeString(),
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
}, [formValid, productoSeleccionado, formData, precios]);



  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseModal = () => {
  setShowModal(false);
  setFormData({ nombre: '', email: '' });
  setProductoSeleccionado('');
  setCompraExitosa(false);
};

const handlePagar = async () => {
 

  const fechaISO = selectedDate.toISOString().split('T')[0];

  console.log("🧾 Enviando preferencia a Mercado Pago:", {
    title: selectedProduct.title,
    unit_price: selectedProduct.price,
    quantity: 1,
    nombre: clienteData.nombre,
    email: clienteData.email,
  
  });

  try {
    const res = await axios.post(
       MERCADOPAGO_API,
  {
    title: selectedProduct.title,
    unit_price: selectedProduct.price,
    quantity: 1,
    nombre: clienteData.nombre,
    email: clienteData.email,
   
  }
    );

    const { init_point } = res.data;

    if (!init_point) {
      throw new Error("No se recibió un init_point válido de Mercado Pago");
    }

    // Redirigir al pago
    window.location.href = init_point;
  } catch (err) {
    console.error('❌ Error al crear preferencia de Mercado Pago:', err.response?.data || err.message || err);
    alert('Hubo un problema al generar el pago. Por favor, intentá más tarde.');
  }
};




 if (bloqueado) {
    return (
      <div className="container my-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
        <h1 className="mb-3">🚧 Sección en construcción 🚧</h1>
        <p className="lead text-center">Estamos preparando nuestros cursos para vos. Muy pronto estarán disponibles ✨</p>
      </div>
    );
  }
  
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
              <h4 className="card-title">CAPACITACIÓN MASAJE TUINA: </h4>
              <h5>TÉCNICAS PROFESIONALES DE LA MEDICINA CHINA</h5>
              <p className="card-text">
               El masaje TuiNa es una rama terapéutica de la Medicina Tradicional China que consta de varias técnicas utilizadas para estimular el flujo de Qi y sangre, liberar bloqueos y contracturas restaurar el equilibrio del cuerpo. Se aplica tanto en dolores físicos como musculares, como en desequilibrios internos. Es uno de los pilares de la medicina china, junto con la acupuntura, la fitoterapia y el Qi Gong.
              </p>
              <p className="fw-bold mb-1">✨ Pack completo: 5 videos + PDF</p>

<div className="d-flex gap-4 flex-wrap">
  {/* Botón PayPal */}
  
  {/* Botón Mercado Pago */}
  
</div>


<div className="d-flex gap-4 flex-wrap justify-content-center">
  {/* PayPal */}
  <div className="p-3 border rounded text-center" style={{ width: "250px" }}>
    
    <p className="text-muted mb-1" style={{ textDecoration: "line-through" }}>
      Precio regular: 276 USD
    </p>
     <p
      className="text-success fw-bold mb-1"
      style={{ fontSize: "1.3rem" }}
    >
      Precio:{" "}$
      {precios.find(p => p.nombreCurso === "Curso de Masaje TuiNa")?.price_usd ||
        "---"}{" "}
      USD
    </p>
      <p className="fw-bold mb-1">
       Todo el mundo
    </p>
      <button
      className="btn btn-secondary btn-lg mt-2 w-100"
      onClick={() => {
        setProductoSeleccionado("curso");
        setShowModal(true);
      }}
    >
      COMPRAR 🌍
    </button>
  </div>

  {/* Mercado Pago */}
  <div className="p-3 border rounded text-center" style={{ width: "250px" }}>
    <p className="text-muted mb-1" style={{ textDecoration: "line-through" }}>
      Precio regular:
    </p>
   <p
      className="text-success fw-bold mb-1"
      style={{ fontSize: "1.3rem" }}
    >
      Precio:{" "}$
      {precios.find(p => p.nombreCurso === "Curso de Masaje TuiNa")?.price_ars ||
        "---"}{" "}
      
    </p>
    <p className="fw-bold mb-1">
       Argentina con Mercado Pago
    </p>
     <button
      className="btn btn-secondary btn-lg mt-2 w-100"
      onClick={() => {
        
        setProductoSeleccionado("curso");
        setShowModal(true);
      }}
    >
      COMPRAR  🇦🇷
    </button>
  </div>
</div>






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
  <strong>Precio:</strong> {precios.find(p => p.nombreCurso === 'Renueva tu SER - Sesión 1 a 1')?.price_usd || '---'} USD
</h5>
              </div>
             

              <div className="d-flex gap-4 flex-wrap justify-content-center">
  {/* PayPal */}
  <div className="p-3 border rounded text-center" style={{ width: "250px" }}>
    
    <p className="text-muted mb-1" style={{ textDecoration: "line-through" }}>
      Precio regular: 
    </p>
     <p
      className="text-success fw-bold mb-1"
      style={{ fontSize: "1.3rem" }}
    >
      Precio:{" "}$
      {precios.find(p => p.nombreCurso === "Sesión 1 a 1: Renueva tu SER")?.price_usd ||
        "---"}{" "}
      USD
    </p>
    <p className="fw-bold mb-1">
       Todo el mundo
    </p>
      <button
      className="btn btn-secondary btn-lg mt-2 w-100"
      onClick={() => {
        setProductoSeleccionado("sesion");
        setShowModal(true);
      }}
    >
      COMPRAR 🌍
    </button>
  </div>

  {/* Mercado Pago */}
  <div className="p-3 border rounded text-center" style={{ width: "250px" }}>
    <p className="text-muted mb-1" style={{ textDecoration: "line-through" }}>
      Precio regular:
    </p>
   <p
      className="text-success fw-bold mb-1"
      style={{ fontSize: "1.3rem" }}
    >
      Precio:{" "}
      
       $
      {precios.find(p => p.nombreCurso === "Sesión 1 a 1: Renueva tu SER")?.price_ars ||
        "---"}{" "}
      
    </p>
    <p className="fw-bold mb-1">
       Argentina con Mercado Pago
    </p>
     <button
      className="btn btn-secondary btn-lg mt-2 w-100"
      onClick={() => {
        setProductoSeleccionado("sesion");
        setShowModal(true);
      }}
    >
      COMPRAR  🇦🇷
    </button>
  </div>
</div>


              
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
  <>
    <div id="paypal-button-container" className="mb-3" />
    <div className="text-center">ó</div>
    <div id="mercadopago-button-container" className="mt-3" />
  </>
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
