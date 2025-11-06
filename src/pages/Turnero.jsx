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
  const [bloqueado] = useState(false); // Cambiar a false para habilitar
  const [loadingPago, setLoadingPago] = useState(false); // NUEVO estado

  // Un solo useEffect para cargar los datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [preciosRes, fechasRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/precios`),
          axios.get(TURNOS_DISPONIBLES_API)
        ]);
        setPrecios(preciosRes.data);
        setFechasDisponibles(fechasRes.data.fechasDisponibles || []);
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
      }
    };
    cargarDatosIniciales();
  }, []);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setShowPopup(true);
    setHorarioSeleccionado(null);

    const fechaISO = date.toISOString().split('T')[0];
    try {
      const res = await axios.get(`${TURNOS_API}/${fechaISO}`);
      const turno = res.data;
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
    if (loadingPago) return; // evita doble click
    setLoadingPago(true);

    if (!selectedDate || !horarioSeleccionado) {
      alert('Por favor, seleccioná una fecha y un horario');
      setLoadingPago(false);
      return;
    }
    if (!clienteData.nombre || !clienteData.email) {
      alert('Por favor, completá tu nombre y email');
      setLoadingPago(false);
      return;
    }
    if (!selectedProduct.title || !selectedProduct.price) {
      alert('Por favor, seleccioná un tipo de masaje');
      setLoadingPago(false);
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
        time: horarioSeleccionado,
        tipo: selectedProduct.title
      });

      const { init_point } = res.data;
      if (!init_point) throw new Error("No se recibió un init_point válido");

      window.location.href = init_point;
    } catch (err) {
      console.error('❌ Error en Mercado Pago:', err.response?.data || err.message || err);
      alert('Hubo un problema al generar el pago.');
    } finally {
      setLoadingPago(false);
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
          {/* IZQUIERDA */}
          <div style={{ flex: 1, color: 'black' }}>
            <h2 className="mb-3">TURNOS:</h2>
            <h4 className="text-violet">NUESTROS MASAJES CORPORALES</h4>
            <p>Descubra nuestros tratamientos</p>
            <p>
              Disfrute o regale una experiencia inolvidable. Nuestros masajes premium son un gesto de amor, belleza y bienestar.
            </p>
            <hr />
            <p>
              <strong className="text-violet"> MASAJE TRADICIONAL :</strong> <br />
              MEDIO CUERPO Espalda, escápula, cervicales, cuello y rostro. Descontracturante.<br />
              <strong>Valor:</strong> $30.000<br />
              <strong>Duración:</strong> 30 min
            </p>
            <p>
              <strong className="text-violet"> MASAJE COMPLETO :</strong> <br />
              CUERPO ENTERO Descontracturante/Terapéutico. Contribuye a reducir el estrés y la ansiedad.
              Incluye GuaSha y Ventosas.<br />
              <strong>Valor:</strong> $35.000<br />
              <strong>Duración:</strong> 60 min
            </p>
            <p>
              <strong className="text-violet"> MASAJE EXCLUSIVO :</strong> <br />
              CUERPO ENTERO Combina todas las técnicas de la medicina china más sesión de ejercicios específicos segun requiera cada caso.<br />
              <strong>Valor:</strong> $50.000<br />
              <strong>Duración:</strong> 90 min
            </p>
            <hr />
            <h5 className="text-violet">PACK TERAPÉUTICO PREMIUM:</h5>
            <p>
              <strong>¡OFERTA!</strong> en un pago:<br />
              • 2 sesiones de masaje completo a $60.000<br />
              • 4 sesiones de masaje completo a $100.000<br />
              Tenés 2 meses para agendar las sesiones. <br />
              Comprando el pack, al agendar la primera sesión, las restantes se coordinan con el masajista.
            </p>
            <p>
              Todos los masajes pueden incluir Drenaje Linfático.<br />
              Los tiempos son estimativos, si se extiende no hay recargo.
            </p>
          </div>

          {/* DERECHA */}
          <div style={{ flex: 1 }}>
            <h2 className="mb-4 text-dark">SELECCIONA UN DIA: </h2>
            <Calendar
              onChange={handleDateChange}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const fechaISO = date.toISOString().split('T')[0];
                  if (fechasDisponibles.includes(fechaISO)) {
                    return 'dia-disponible';
                  }
                }
                return null;
              }}
              className="custom-calendar"
            />

            {showPopup && (
              <div className="popup-container position-fixed top-50 start-50 translate-middle p-4 custom-popup"
                style={{ zIndex: 1050, maxWidth: '500px', width: '100%' }}>
                <h5 className="mb-3">Horarios disponibles para {selectedDate.toDateString()}</h5>
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
                    : <span>No hay horarios disponibles</span>}
                </div>
                {horarioSeleccionado && (
                  <div className="mt-3">
                    <h6 className="mb-3 text-center">Elegí el tipo de masaje:</h6>
                    <div className="d-grid gap-3">
                      {precios
                        .sort((b, a) => a.masajeType.localeCompare(b.masajeType))
                        .map(item => (
                          <div key={item.masajeType} className="d-flex justify-content-between align-items-center border p-2 rounded mb-2">
                            <div className="d-flex flex-column">
                              <span>{item.masajeType}</span>
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => {
                                  setSelectedProduct({ title: item.masajeType, price: item.price });
                                  setShowFormModal(true);
                                }}
                              >
                                Pagar {item.price.toLocaleString()}
                              </button>
                              {item.permiteSenia && (
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => {
                                    setSelectedProduct({ title: item.masajeType, price: item.price2 });
                                    setShowFormModal(true);
                                  }}
                                >
                                  Seña ${item.price2?.toLocaleString()}
                                </button>
                              )}
                            </div>
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

            {showFormModal && (
              <div className="popup-container position-fixed top-50 start-50 translate-middle p-4 bg-light text-dark rounded"
                style={{ zIndex: 1100, maxWidth: '500px', width: '100%' }}>
                <h5 className="mb-3">Datos del Cliente</h5>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control"
                    value={clienteData.nombre}
                    onChange={e => setClienteData({ ...clienteData, nombre: e.target.value })} />
                </div>
                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control"
                    value={clienteData.email}
                    onChange={e => setClienteData({ ...clienteData, email: e.target.value })} />
                </div>
                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={handlePagar}
                  disabled={loadingPago}
                >
                  {loadingPago ? "Procesando..." : "Confirmar y Pagar"}
                </button>
                <button className="btn btn-secondary w-100" onClick={() => setShowFormModal(false)}>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Turnero;
