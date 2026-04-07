import { useState } from "react";

const TextoColapsable = ({ children, limite = 150 }) => {
  const [expandido, setExpandido] = useState(false);

  return (
    <div>
      <div
        className="card-text"
        style={{
          maxHeight: expandido ? "none" : "120px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>

      <span
        onClick={() => setExpandido(!expandido)}
        style={{ cursor: "pointer", color: "#0d6efd" }}
      >
        {expandido ? "Ver menos" : "Ver más"}
      </span>
    </div>
  );
};

export default TextoColapsable;