import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Función que sirve para proteger rutas exclusivas del Jugador Registrado
export default function EsJugadorRegistrado() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    // Validar token y userId
    if (!token || !userId) {
      alert("Debes iniciar sesión para acceder a esta sección.");
      navigate("/login");
      return;
    }

    const verificarJugador = async () => {
      try {
        const res = await fetch(
          `https://webxperts-back-252s2-y0rk.onrender.com/jugadorregistrados/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Si no es jugador registrado, se hace pop up de que solo un jugador registrado puede acceder aqui
        if (res.status !== 200) {
          alert("Solo los jugadores registrados pueden acceder aquí.");
          navigate("/login");
          return;
        }
      } catch (error) {
        alert("Error verificando permisos. Inicia sesión nuevamente.");
        navigate("/login");
      }
    };

    verificarJugador();
  }, [navigate]);
}
