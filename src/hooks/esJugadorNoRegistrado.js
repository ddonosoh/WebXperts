import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Función que sirve para proteger rutas exclusivas del Jugador No Registrado
export default function EsJugadorNoRegistrado() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    if (!token || !userId) {
      alert("Debes ser jugador no registrado para continuar.");
      navigate("/");
      return;
    }

    const verificar = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/jugadornoregistrados/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Si falla, quiere decir que no es nada en la página, ni siquiera un invitado
        if (res.status !== 200) {
          alert("Solo los jugadores no registrados pueden acceder aquí.");
          navigate("/");
          return;
        }
      } catch (error) {
        alert("Error verificando permisos. Intenta nuevamente.");
        navigate("/");
      }
    };

    verificar();
  }, [navigate]);
}
