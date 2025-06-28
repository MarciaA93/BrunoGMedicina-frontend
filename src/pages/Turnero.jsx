// src/pages/Turnero.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Turnero.css';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TURNOS_API = `${API_BASE_URL}/api/turnos`;
const MP_PUBLIC_KEY = 'TEST-f0b98895-c546-4940-9469-937059dbb244'; 
const MERCADOPAGO_API = `${API_BASE_URL}/api/mercadopago/create_preference`;

function Turnero() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setShowPopup(true);
    setHorarioSeleccionado(null);

    const fechaISO = date.toISOString().split('T')[0];
    try {
      const res = await axios.get(TURNOS_API);
      const turno = res.data.find(t => t.date === fechaISO);
      setHorariosDisponibles(
        turno
          ? turno.timeSlots.filter(s => s.available).map(s => s.time)
          : []
      );
    } catch (err) {
      console.error(err);
      setHorariosDisponibles([]);
    }
  };

  const handleHorarioClick = (hora) => {
    setHorarioSeleccionado(hora);
  };

const handlePagar = async (title, unit_price) => {
  if (!selectedDate || !horarioSeleccionado) {
    alert('Por favor, seleccioná una fecha y un horario');
    return;
  }

  const fechaISO = selectedDate.toISOString().split('T')[0];

  try {
    const response = await axios.post(
       `${MERCADOPAGO_API}?date=${fechaISO}&time=${horarioSeleccionado}`,
      {
        title,
        unit_price
      },
       {
    headers: {
      'Content-Type': 'application/json'
    }
       }
    );
    window.location.href = response.data.init_point;
  } catch (error) {
    console.error('Error creando preferencia:', error);
  }
};



  return (
    <div className="container py-5 d-flex gap-4" style={{ paddingTop: '4rem' }}>
      {/* IZQUIERDA: Descripción */}
      <div style={{ flex: 1, color: 'white' }}>
        <h2>Tipos de masajes</h2>
        <p></p>
        <p><strong>TuiNa tradicional:</strong> Masaje de espalda, escápula, cervicales, cuello y rostro. Descontracturante/Relajante. Duración: 45 min aprox. Valor: $21.000</p>
        <p><strong>TuiNa Premium:</strong> Masaje cuerpo completo. Equilibrio total, mejora estrés y ansiedad. Incluye Ventosas y GuaSha. Duración: 70 min aprox. Valor: $23.000</p>
        <p><strong>¡OFERTA! Pack terapéutico:</strong></p>
        <ul>
          <li>2 sesiones – $40.000</li>
          <li>4 sesiones – $78.000</li>
        </ul>
        <p>💫 Promueven el bienestar energético, emocional y espiritual. Pueden incluir drenaje linfático. Tenés dos meses para agendar las sesiones.</p>
      </div>

      {/* DERECHA: Calendario y Popup */}
      <div style={{ flex: 1 }}>
        <h2 className="mb-4 text-light">Seleccioná un día</h2>
        <Calendar onChange={handleDateChange} className="custom-calendar" />

        {showPopup && (
          <div className="popup-container position-fixed top-50 start-50 translate-middle p-4 bg-dark text-light rounded shadow"
               style={{ zIndex: 1050, maxWidth: '500px', width: '100%' }}>
            <h5 className="mb-3">
              Horarios disponibles para {selectedDate.toDateString()}
            </h5>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {horariosDisponibles.length > 0
                ? horariosDisponibles.map(h => (
                    <button
                      key={h}
                      className={`btn ${horarioSeleccionado === h ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => handleHorarioClick(h)}
                    >
                      {h}
                    </button>
                  ))
                : <span>No hay horarios disponibles</span>
              }
            </div>

            {horarioSeleccionado && (
              <div className="mt-3">
                <h6 className="mb-3 text-center">Elegí el tipo de masaje:</h6>
                <div className="d-grid gap-3">
                  {[
                    { label: 'TuiNa Tradicional', price: 21000 },
                    { label: 'TuiNa Premium',     price: 23000 },
                    { label: 'Pack 2 sesiones',    price: 40000 },
                    { label: 'Pack 4 sesiones',    price: 78000 },
                  ].map(item => (
                    <div key={item.label}
                         className="d-flex justify-content-between align-items-center border p-2 rounded">
                      <span>{item.label}</span>
                      <span>${item.price.toLocaleString()}</span>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handlePagar(item.label, item.price)}
                      >
                        Pagar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn btn-dark mt-4 w-100" onClick={() => setShowPopup(false)}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Turnero;
