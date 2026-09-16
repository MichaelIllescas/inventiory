const CustomTooltip = ({
    step,
    index,
    size,
    backProps,
    closeProps,
    primaryProps,
    skipProps,
    isLastStep,
  }) => {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "1.5rem",
          maxWidth: 400,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          fontFamily: "'Segoe UI', sans-serif",
          color: "#333",
          transform: "translate(-5%, -0%)",
        }}
      >
        {/* Contenido del paso */}
        <div style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>
          {step.content}
        </div>
  
        {/* Footer con botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <button
            {...skipProps}
            style={{
              background: "transparent",
              border: "none",
              color: "#888",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Saltar
          </button>
  
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            {index > 0 && (
              <button
                {...backProps}
                style={{
                  backgroundColor: "#f1f1f1",
                  border: "1px solid #ccc",
                  padding: "5px 16px",
                  borderRadius: "6px",
                  color: "#333",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Atrás
              </button>
            )}
            <button
              {...primaryProps}
              style={{
                backgroundColor: "#d62828",
                border: "none",
                padding: "0x 10px",
                borderRadius: "6px",
                color: "#fff",
                fontWeight: 400,
                cursor: "pointer",
              }}
            >
              {isLastStep
                ? "Finalizar"
                : `Siguiente (Paso ${index + 1} de ${size})`}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomTooltip;
  