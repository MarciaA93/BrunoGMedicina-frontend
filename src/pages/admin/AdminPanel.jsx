// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import './AdminPanel.css';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/turnos`;

export default function AdminPanel() {
  const [turnos, setTurnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ date: '', timeSlots: [] });
  const [newSlot, setNewSlot] = useState('');
  // Estado para precios
const [prices, setPrices] = useState([]);
const [editingPrice, setEditingPrice] = useState({ tipo: '', price: '' });


  useEffect(() => {
    fetchTurnos();
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/precios`).then(res => setPrices(res.data));
  }, []);

  const fetchTurnos = async () => {
    const res = await axios.get(API_URL);
    setTurnos(res.data);
  };
  const [compras, setCompras] = useState([]);

useEffect(() => {
  fetchTurnos();
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/precios`).then(res => setPrices(res.data));
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/`).then(res => setCompras(res.data)); // <- esto
}, []);

  
  // Función para actualizar
const handleUpdatePrice = async () => {
  await axios.put(
   `${import.meta.env.VITE_API_BASE_URL}/api/precios/${editingPrice.tipo}`,
    { price: editingPrice.price }
  );
  const updated = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/precios`);
  setPrices(updated.data);
  setEditingPrice({ tipo: '', price: '' });
};

  const handleOpen = (turno = null) => {
    if (turno) {
      setEditData({
        date: turno.date,
        timeSlots: turno.timeSlots.map(s => s.time),
      });
    } else {
      setEditData({ date: '', timeSlots: [] });
    }
    setNewSlot('');
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDateChange = e => {
    setEditData(d => ({ ...d, date: e.target.value }));
  };

  const handleAddSlot = () => {
    if (newSlot && !editData.timeSlots.includes(newSlot)) {
      setEditData(d => ({ ...d, timeSlots: [...d.timeSlots, newSlot] }));
      setNewSlot('');
    }
  };

  const handleRemoveSlot = slot => {
    setEditData(d => ({
      ...d,
      timeSlots: d.timeSlots.filter(s => s !== slot),
    }));
  };

  const handleSave = async () => {
    const payload = {
      date: editData.date,
      timeSlots: editData.timeSlots.map(t => ({ time: t, available: true })),
    };
     await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/turnos`, payload);
    fetchTurnos();
    handleClose();
  };

  return (
    <div className="admin-panel container py-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <div className="mb-4 text-end">
        <Button variant="success" onClick={() => handleOpen()}>
          + Nuevo Día
        </Button>
      </div>

      <Table hover bordered className="table bg-transparent text-light">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Horarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map(t => (
            <tr key={t._id}>
              <td>{t.date}</td>
              <td>
                {t.timeSlots.map(s => (
                  <span key={s.time} className="badge bg-secondary me-1">
                    {s.time} {s.available ? '' : '(X)'}
                  </span>
                ))}
              </td>
              <td>
                <Button size="sm" onClick={() => handleOpen(t)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
<div className="mt-5">
  <h4 className="text-light">Compras Realizadas</h4>
  <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Producto</th>
        <th>Fecha</th>
        <th>Método</th>
      </tr>
    </thead>
    <tbody>
      {compras.map((c, i) => (
        <tr key={i}>
          <td>{c.nombre}</td>
          <td>{c.email}</td>
          <td>{c.producto}</td>
          <td>{new Date(c.fechaCompra).toLocaleString()}</td>
          <td>{c.metodo}</td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

   
{/* Turnos Reservados */}
<div className="mt-5">
  <h4 className="text-light">Turnos Reservados</h4>
  <h3 className="text-light">ON BULDING</h3>
  <ul className="list-group list-group-flush">
    {turnos.flatMap(t =>
      t.timeSlots
        .filter(s => !s.available)
        .map(s => (
          <li
            key={`${t.date}-${s.time}`}
            className="list-group-item bg-dark text-light"
          >
            {t.date} — {s.time}
          </li>
        ))
    )}
  </ul>
</div>

<div className="mt-5">
  <h4>Modificar Precios</h4>
  <h3 className="text-light">ON BULDING</h3>
  <Table className="table-dark text-light">
    <thead>
      <tr><th>Tipo de Masaje</th><th>Precio Actual</th><th>Acciones</th></tr>
    </thead>
    <tbody>
      {prices.map(p => (
        <tr key={p.masajeType}>
          <td>{p.masajeType}</td>
          <td>${p.price}</td>
          <td>
            <Button size="sm" onClick={() => setEditingPrice(p)}>Editar</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

   {/* Modal de edición de precio */}
  <Modal show={!!editingPrice.tipo} onHide={() => setEditingPrice({ tipo:'',price:'' })}>
    <Modal.Header closeButton><Modal.Title>Editar Precio</Modal.Title></Modal.Header>
    <Modal.Body>
      <Form.Group>
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="text" value={editingPrice.tipo} readOnly />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          value={editingPrice.price}
          onChange={e => setEditingPrice(d => ({ ...d, price: e.target.value }))}
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setEditingPrice({ tipo:'',price:'' })}>Cancelar</Button>
      <Button variant="primary" onClick={handleUpdatePrice}>Guardar</Button>
    </Modal.Footer>
  </Modal>
</div>



      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editData.date ? 'Editar Día' : 'Nuevo Día'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={editData.date}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Agregar Horario</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="time"
                  value={newSlot}
                  onChange={e => setNewSlot(e.target.value)}
                />
                <Button type="button" onClick={handleAddSlot} className="ms-2">
                  +
                </Button>
              </div>
            </Form.Group>

            <div>
              {editData.timeSlots.map(slot => (
                <span
                  key={slot}
                  className="badge bg-info text-dark me-1 mb-1 d-inline-flex align-items-center"
                >
                  {slot}
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(slot)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      marginLeft: '0.5rem',
                      cursor: 'pointer',
                      color: '#dc3545',
                      fontSize: '1rem',
                      lineHeight: '1',
                    }}
                    aria-label={`Eliminar horario ${slot}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


