import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Turnero.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TURNOS_API = `${API_BASE_URL}/api/turnos`;
const MERCADOPAGO_API = `${API_BASE_URL}/api/mercadopago/create_preference`;
const TURNOS_DISPONIBLES_API = `${API_BASE_URL}/api/turnos/disponibles`;

function Turnero() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [clienteData, setClienteData] = useState({ nombre: '', email: '' });
  const [selectedProduct, setSelectedProduct] = useState({ title: '', price: 0 });
  const [showFormModal, setShowFormModal] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [bloqueado] = useState(true); // 👈 cambiar a false cuando quieras habilitar la página

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/precios`)
      .then(res => setPrecios(res.data))
      .catch(err => console.error('Error al cargar precios:', err));
  }, []);

  useEffect(() => {
    axios.get(TURNOS_DISPONIBLES_API)
      .then(res => setFechasDisponibles(res.data.fechasDisponibles || []))
      .catch(err => console.error("Error cargando fechas disponibles:", err));
  }, []);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setShowPopup(true);
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

  const handleHorarioClick = (hora) => {
    setHorarioSeleccionado(hora);
  };

  const handlePagar = async () => {
    if (!selectedDate || !horarioSeleccionado) {
      alert('Por favor, seleccioná una fecha y un horario');
      return;
    }
    if (!clienteData.nombre || !clienteData.email) {
      alert('Por favor, completá tu nombre y email');
      return;
    }
    if (!selectedProduct.title || !selectedProduct.price) {
      alert('Por favor, seleccioná un tipo de masaje');
      return;
    }

    const fechaISO = selectedDate.toISOString().split('T')[0];
    try {
      const res = await axios.post(MERCADOPAGO_API, {
        title: selectedProduct.title,
        unit_price: selectedProduct.price,
        quantity: 1,
        nombre: clienteData.nombre,
        email: clienteData.email,
        date: fechaISO,
        time: horarioSeleccionado
      });

      const { init_point } = res.data;
      if (!init_point) throw new Error("No se recibió un init_point válido");

      window.location.href = init_point;
    } catch (err) {
      console.error('❌ Error en Mercado Pago:', err.response?.data || err.message || err);
      alert('Hubo un problema al generar el pago.');
    }
  };

  return (
    <div className="container py-5 d-flex flex-column flex-md-row gap-4" style={{ paddingTop: '4rem' }}>
      {bloqueado ? (
        <div className="d-flex flex-column justify-content-center align-items-center text-center w-100 py-5">
          <h2 className="mb-3">🚧 Sitio en construcción 🚧</h2>
          <p className="lead">Estamos trabajando para traerte algo increíble ✨</p>
          <p className="text-muted">Vuelve a visitarnos pronto 💜</p>
        </div>
      ) : (
        <>
          {/* IZQUIERDA: Descripción */}
          <div style={{ flex: 1, color: 'black' }}>
            <h2 className="mb-3">TURNOS:</h2>
            {/* ... 🔽 resto de tu descripción */}
          </div>

          {/* DERECHA: Calendario y Popup */}
          <div style={{ flex: 1 }}>
            <h2 className="mb-4 text-dark">SELECCIONA UN DIA: </h2>
            <Calendar
              onChange={handleDateChange}
              tileClassName={({ date }) => {
                const fechaISO = date.toISOString().split('T')[0];
                return fechasDisponibles.includes(fechaISO) ? 'dia-disponible' : null;
              }}
              className="custom-calendar"
            />
            {/* ... 🔽 resto de tu lógica de turnos y popups */}
          </div>
        </>
      )}
    </div>
  );
}

export default Turnero;
