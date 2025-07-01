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
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkData, setLinkData] = useState({ title: '', url: '' });

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

  const handlePagar = (title, unit_price) => {
    if (!selectedDate || !horarioSeleccionado) {
      alert('Por favor, seleccioná una fecha y un horario');
      return;
    }

    // Popup provisorio con link personalizado a WhatsApp
    setLinkData({
      title,
      url: 'https://calendly.com/grattonibruno?fbclid=PAZXh0bgNhZW0CMTEAAaeQ7fdpzcnIQR4cSYOHrGJmTarTTpzCOiRc68haKim-zU2S1HcVuJf64XHWjg_aem_kyBNt41K1dX-w1wL68fGLw' + encodeURIComponent(title)
    });
    setShowLinkPopup(true);
  };

  return (
    <div className="container py-5 d-flex flex-column flex-md-row gap-4" style={{ paddingTop: '4rem' }}>
      {/* IZQUIERDA: Descripción */}
      <div style={{ flex: 1, color: 'white' }}>
        <h2 className="mb-3">TURNOS:</h2>

        <h4>NUESTROS MASAJES CORPORALES</h4>
        <p>Descubra nuestros tratamientos</p>
        <p>
          Disfrute o regale una experiencia inolvidable. Nuestros masajes premium son un gesto de amor, belleza y bienestar.
        </p>

        <hr />

        <p><strong>🙌 Masaje Tradicional:</strong> medio cuerpo.<br />
           Espalda, escápula, cervicales, cuello y rostro. Descontracturante.<br />
           💸 <strong>Valor:</strong> $25.000<br />
           🕣 <strong>Duración:</strong> 30 min
        </p>

        <p><strong>🙌 Masaje Premium:</strong> cuerpo entero.<br />
           Descontracturante/terapéutico. Contribuye a reducir el estrés y la ansiedad.<br />
           Incluye GuaSha y Ventosas.<br />
           💸 <strong>Valor:</strong> $30.000<br />
           🕣 <strong>Duración:</strong> 60 min
        </p>

        <hr />

        <h5>PACK TERAPÉUTICO PREMIUM:</h5>
        <p>
          💰 <strong>¡OFERTA!</strong> en un pago:<br />
          • 2 sesiones a $45.000<br />
          • 4 sesiones a $100.000<br />
          Tenés 2 meses para agendar las sesiones.
        </p>

        <p>💫 Todos los masajes pueden incluir Drenaje Linfático.<br />
           ⌛ Los tiempos son estimativos, si se extiende no hay recargo.
        </p>

        <hr />

        <p><strong>📍 Ubicación:</strong><br />
           Paraná 1132, GC, MDZ.
        </p>

        <p><strong>📧 Correo:</strong><br />
           <a href="mailto:brunomedicinachina@gmail.com" className="text-white">brunomedicinachina@gmail.com</a>
        </p>

        <p><strong>📱 WhatsApp de contacto:</strong><br />
           <a href="https://wa.me/541165315863" target="_blank" rel="noopener noreferrer" className="text-white">1165315863</a>
        </p>
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

        {/* POPUP PROVISORIO DE ENLACE */}
        {showLinkPopup && (
          <div className="popup-container position-fixed top-50 start-50 translate-middle p-4 bg-light text-dark rounded shadow"
               style={{ zIndex: 1100, maxWidth: '500px', width: '100%' }}>
            <h5 className="mb-3">¡Paso final!</h5>
            <p>
              Para confirmar el turno de <strong>{linkData.title}</strong>, hacé clic en el siguiente enlace:
            </p>
            <a href={linkData.url} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 mb-3">
              Ir a confirmar
            </a>
            <button className="btn btn-secondary w-100" onClick={() => setShowLinkPopup(false)}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Turnero;
