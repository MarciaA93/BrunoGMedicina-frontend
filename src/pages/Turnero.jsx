
// ✅ Paso 2: Turnero.jsx limpio con Checkout API (Formulario embebido)

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Turnero.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TURNOS_API = `${API_BASE_URL}/api/turnos`;
const PAGAR_API = `${API_BASE_URL}/api/mercadopago/pagar`;
const MP_PUBLIC_KEY = 'APP_USR-9c2456cc-e355-490b-b4f9-f79ae9510e1e'; // <- reemplazá con la real

function Turnero() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [clienteData, setClienteData] = useState({ nombre: '', email: '' });
  const [selectedProduct, setSelectedProduct] = useState({ title: '', price: 0 });
  const [precios, setPrecios] = useState([]);
  const [cardFormLoaded, setCardFormLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/precios`)
      .then(res => setPrecios(res.data))
      .catch(err => console.error('Error al cargar precios:', err));
  }, []);

  useEffect(() => {
    if (window.MercadoPago && !cardFormLoaded) {
      const mp = new window.MercadoPago(MP_PUBLIC_KEY);

      mp.bricks().create('cardPayment', 'card-form', {
        initialization: {
          amount: selectedProduct.price || 0,
        },
        callbacks: {
          onSubmit: async (cardFormData) => {
            try {
              const res = await axios.post(PAGAR_API, {
                ...cardFormData,
                nombre: clienteData.nombre,
                email: clienteData.email,
                producto: selectedProduct.title,
                date: selectedDate.toISOString().split('T')[0],
                time: horarioSeleccionado,
              });
              alert('✅ Pago exitoso');
            } catch (error) {
              console.error(error);
              alert('❌ Error al procesar el pago');
            }
          },
        }
      });

      setCardFormLoaded(true);
    }
  }, [cardFormLoaded, selectedProduct]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setHorarioSeleccionado(null);

    const fechaISO = date.toISOString().split('T')[0];
    try {
      const res = await axios.get(TURNOS_API);
      const turno = res.data.find(t => t.date === fechaISO);
      setHorariosDisponibles(
        turno ? turno.timeSlots.filter(s => s.available).map(s => s.time) : []
      );
    } catch (err) {
      console.error(err);
      setHorariosDisponibles([]);
    }
  };

  return (
    <div className="container">
      <h2>Turnos</h2>
      <Calendar onChange={handleDateChange} />

      {selectedDate && (
        <>
          <h5>Horarios para {selectedDate.toDateString()}</h5>
          {horariosDisponibles.map(h => (
            <button key={h} onClick={() => setHorarioSeleccionado(h)}>{h}</button>
          ))}
        </>
      )}

      {horarioSeleccionado && (
        <>
          <h5>Elegí tipo de masaje</h5>
          {precios.map(p => (
            <button key={p.masajeType} onClick={() => setSelectedProduct({ title: p.masajeType, price: p.price })}>
              {p.masajeType} - ${p.price.toLocaleString()}
            </button>
          ))}
        </>
      )}

      {selectedProduct.title && (
        <>
          <h5>Datos del cliente</h5>
          <input type="text" placeholder="Nombre" value={clienteData.nombre} onChange={e => setClienteData({ ...clienteData, nombre: e.target.value })} />
          <input type="email" placeholder="Email" value={clienteData.email} onChange={e => setClienteData({ ...clienteData, email: e.target.value })} />

          <div id="card-form" style={{ marginTop: '20px' }}></div>
        </>
      )}
    </div>
  );
}

export default Turnero;