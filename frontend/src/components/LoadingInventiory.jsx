import { useEffect } from "react";
import { Animate, AnimateGroup } from "react-simple-animate";

export const LoadingInventiory = ({ onFinish }) => {
  const text = "Inventiory".split(""); // Separa la palabra en letras

  useEffect(() => {
    // Calcula el tiempo total de la animación antes de mostrar el login
    const animationDuration = text.length * 200 + 1000; // Basado en la animación
    const timer = setTimeout(onFinish, animationDuration);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <AnimateGroup play>
        {text.map((letter, index) => (
          <Animate
            key={index}
            sequenceIndex={index}
            start={{ opacity: 0, transform: "translateY(-10px)" }}
            end={{ opacity: 1, transform: "translateY(0)" }}
            duration={0.2}
          >
            <span className="text-light display-3 fw-bold mx-1">{letter}</span>
          </Animate>
        ))}
      </AnimateGroup>
    </div>
  );
};
