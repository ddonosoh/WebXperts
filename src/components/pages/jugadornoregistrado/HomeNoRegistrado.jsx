import "../../../css/jugadorregistrado/stylehomeregistrado.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import EsJugadorNoRegistrado from "../../../hooks/esJugadorNoRegistrado";
import {
  buscarOParticiparNoRegistrado,
} from "../../../js/partida.js";

export default function HomeNoRegistrado() {
  
  EsJugadorNoRegistrado();
  
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.user || "Jugador";
  const [mensajeError, setMensajeError] = useState("");

  const handleBuscarPartidaNoRegistrado = async () => {
    setMensajeError("");


    try {
      const res = await buscarOParticiparNoRegistrado();

      if (res?.error) {
        setMensajeError(res.error);
        return;
      }
      localStorage.setItem("debug_partida", JSON.stringify(res));
      navigate("/matchmaking", { state: { partida: res} });
    } catch (error) {
      setMensajeError(error.message || "Error inesperado al buscar partida.");
    }
  };


  return (
    <main className="home-registrado-container">
      <h1>¡Bienvenido, {username}!</h1>
      <p className="subtitle">Cuando estés listo, puedes empezar a jugar :D</p>
    
      <div className="botones">
        <button onClick={handleBuscarPartidaNoRegistrado}>Encontrar Partida</button>
      </div>
    </main>
  );
}
