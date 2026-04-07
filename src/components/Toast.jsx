import { useEffect, useRef } from "react";

const Toast = ({ mensaje = "Próximamente 🚀", mostrar, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (mostrar && toastRef.current) {
      const toast = new window.bootstrap.Toast(toastRef.current, {
        delay: 2500,
      });
      toast.show();

      toastRef.current.addEventListener("hidden.bs.toast", onClose);
    }
  }, [mostrar]);

  return (
    <div className="toast-container position-fixed top-50 start-50 translate-middle p-3">
      <div
        ref={toastRef}
        className="toast align-items-center text-bg-dark border-0"
      >
        <div className="d-flex">
          <div className="toast-body">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;