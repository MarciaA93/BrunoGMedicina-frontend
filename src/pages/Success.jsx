import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Asegúrate de que esta variable de entorno esté configurada en tu proyecto de frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Success() {
  const location = useLocation();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('payment_id');
    const status = params.get('status');

    if (status === 'approved' && paymentId) {
      console.log('✅ Pago aprobado, buscando detalles...');
      
      // Hacemos una llamada a un nuevo endpoint en el backend para buscar la compra
      axios.get(`${API_BASE_URL}/api/compras/payment/${paymentId}`)
        .then(res => {
          setCompra(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error al buscar la compra:', err);
          setError('No pudimos encontrar los detalles de tu compra, pero te hemos enviado un email de confirmación.');
          setLoading(false);
        });
    } else {
      // Manejar otros estados si es necesario (pending, failure)
      setError('El pago no fue aprobado.');
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Estamos confirmando tu compra...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>😕 Hubo un problema</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✅ ¡Gracias por tu compra, {compra?.nombre}!</h1>
      {compra?.producto === 'turno' ? (
        <>
          <p>Tu turno fue reservado correctamente.</p>
          <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem auto', maxWidth: '400px', borderRadius: '8px' }}>
            <h4>Detalles del Turno</h4>
            <p><strong>Fecha:</strong> {compra.descripcion.split(' ')[3]}</p>
            <p><strong>Hora:</strong> {compra.descripcion.split(' ')[5]}</p>
          </div>
        </>
      ) : (
        <>
          <p>Tu inscripción al curso fue confirmada.</p>
           <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem auto', maxWidth: '400px', borderRadius: '8px' }}>
            <h4>Detalles del Curso</h4>
            <p><strong>Curso:</strong> {compra.producto}</p>
          </div>
        </>
      )}
      <p>Te enviamos un email con los detalles.</p>
    </div>
  );
}

export default Success;