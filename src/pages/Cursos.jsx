import React, { useState, useEffect } from "react";
import "./Cursos.css";
import { Modal, Button, Form } from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TURNOS_API = `${API_BASE_URL}/api/turnos`;
const MERCADOPAGO_API = `${API_BASE_URL}/api/mercadopago/create_course_preference`;

const Cursos = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", email: "" });
  const [formValid, setFormValid] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [bloqueado] = useState(true); // ponelo en false cuando quieras habilitarlo

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AcnkQsE54OtQGTt0dG8ucQh79wqIm4IXMzYV1JWUGYyxnFGM2lBBg6akcqjBepoHskhEtGtFM74oGs2p&currency=USD";
    script.async = true;
    script.onload = () => {
      console.log("PayPal SDK cargado correctamente");
    };
    script.onerror = () => {
      console.error("Error al cargar el SDK de PayPal");
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/precios-cursos`)
      .then((res) => res.json())
      .then((data) => setPrecios(data));
  }, []);

  // Validar campos
  useEffect(() => {
    const { nombre, email } = formData;
    setFormValid(nombre.trim() !== "" && email.includes("@"));
  }, [formData]);

  // Renderizar PayPal
  useEffect(() => {
    if (formValid && window.paypal && productoSeleccionado) {
      const cursoElegido = precios.find((p) =>
        productoSeleccionado === "curso"
          ? p.nombreCurso.includes("TuiNa")
          : p.nombreCurso.includes("Renueva")
      );

      const precio = cursoElegido?.price_usd || "0.00";
      const descripcion =
        productoSeleccionado === "curso"
          ? "Curso online: Masaje TuiNa"
          : "Sesión 1 a 1: Renueva tu SER";

      document.getElementById("paypal-button-container").innerHTML = "";

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: precio },
                  description: descripcion,
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(async (details) => {
              try {
                const response = await fetch(
                  `${API_BASE_URL}/api/guardar-compra`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      nombre: formData.nombre,
                      email: formData.email,
                      producto: productoSeleccionado,
                      paypalDetails: details,
                    }),
                  }
                );

                if (!response.ok) throw new Error("Error al guardar la compra");

                setCompraExitosa(true);
                setTimeout(handleCloseModal, 3000);
              } catch (error) {
                console.error("Error al confirmar la compra:", error);
                alert(
                  "La compra fue realizada, pero ocurrió un problema al guardar los datos."
                );
              }
            });
          },
        })
        .render("#paypal-button-container");
    }
  }, [formValid, productoSeleccionado, formData.email, formData.nombre]);

  // Renderizar botón de Mercado Pago
  useEffect(() => {
    if (formValid && productoSeleccionado) {
      const cursoElegido = precios.find((p) =>
        productoSeleccionado === "curso"
          ? p.nombreCurso.includes("TuiNa")
          : p.nombreCurso.includes("Renueva")
      );

      const precio = cursoElegido?.price_ars || 0;
      const descripcion =
        productoSeleccionado === "curso"
          ? "Curso online: Masaje TuiNa"
          : "Sesión 1 a 1: Renueva tu SER";

      const container = document.getElementById(
        "mercadopago-button-container"
      );
      if (container) container.innerHTML = "";

      if (container) {
        const btn = document.createElement("button");
        btn.className = "btn btn-primary btn-lg w-100";
        btn.textContent = "Pagar con Mercado Pago 🇦🇷";
        btn.onclick = async () => {
          try {
            const res = await fetch(MERCADOPAGO_API, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: descripcion,
                unit_price: precio,
                quantity: 1,
                nombre: formData.nombre,
                email: formData.email,
              }),
            });
            const data = await res.json();
            if (!data.init_point) throw new Error("No se recibió init_point");

            window.location.href = data.init_point;
          } catch (err) {
            console.error("❌ Error en Mercado Pago:", err);
            alert("Hubo un problema con Mercado Pago.");
          }
        };

        container.appendChild(btn);
      }
    }
  }, [
    formValid,
    productoSeleccionado,
    formData.email,
    formData.nombre,
    precios,
  ]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nombre: "", email: "" });
    setProductoSeleccionado("");
    setCompraExitosa(false);
  };

  return (
    <div className="container my-5">
      {bloqueado ? (
        <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">
          <h2 className="mb-3">🚧 Sitio en construcción 🚧</h2>
          <p className="lead">
            Estamos trabajando para traerte algo increíble ✨
          </p>
          <p className="text-muted">Vuelve a visitarnos pronto 💜</p>
        </div>
      ) : (
        <div className="row g-4">
          {/* 🔽 TODO tu contenido de cursos/sesiones aquí */}
        </div>
      )}
    </div>
  );
};

export default Cursos;
