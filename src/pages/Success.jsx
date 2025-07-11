import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("payment_id");
    const status = params.get("status");

    console.log("✅ Redirigido desde MercadoPago");
    console.log("🆔 ID de pago:", paymentId);
    console.log("📌 Estado del pago:", status);
  }, [location]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✅ ¡Gracias por tu compra!</h1>
      <p>Tu turno fue reservado correctamente.</p>
      <p>Te enviamos un email con los detalles.</p>
    </div>
  );
}

export default Success;
