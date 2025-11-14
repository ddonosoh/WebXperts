import "../../../css/jugadorregistrado/styleseleccionimperio.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarOParticiparRegistrado,
  buscarOParticiparRegistradoconIdPartida
} from "../../../js/partida.js";

import romano from "../../../img/soldado_romano.jpg";
import vikingo from "../../../img/soldado_vikingo.webp";
import chino from "../../../img/soldado_chino.jpg";
import inca from "../../../img/soldado_incaa.jpg";
import EsJugadorRegistrado from "../../../hooks/esJugadorRegistrado";

export default function SeleccionarImperio() {
  
  EsJugadorRegistrado();
  
  const [imperio, setImperio] = useState("");
  const [idPartida, setIdPartida] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const handleBuscarAuto = async () => {
    setMensajeError("");

    if (!imperio) {
      setMensajeError("Selecciona un imperio primero.");
      return;
    }

    try {
      const res = await buscarOParticiparRegistrado(imperio);

      if (res?.error) {
        setMensajeError(res.error);
        return;
      }

      navigate("/matchmaking", { state: { partida: res, imperio } });
    } catch (error) {
      setMensajeError(error.message || "Error inesperado al buscar partida.");
    }
  };

  const handleBuscarPorId = async () => {
    setMensajeError("");

    if (!imperio || !idPartida) {
      setMensajeError("Ingresa un ID de partida y selecciona un imperio.");
      return;
    }

    try {
      const res = await buscarOParticiparRegistradoconIdPartida(idPartida, imperio);

      if (res?.error) {
        setMensajeError(res.error);
        return;
      }

      navigate("/matchmaking", { state: { partida: res, imperio } });
    } catch (error) {
      setMensajeError(error.message || "Error inesperado al unirse a la partida.");
    }
  };

  return (
    <main className="imperio-container">
      <h1>Selecciona tu Imperio</h1>

      <div className="imperios-grid">
        <div
          className={`imperio-card ${imperio === "Romanos" ? "selected" : ""}`}
          onClick={() => setImperio("Romanos")}
        >
          <img src={romano} alt="Imperio Romano" />
          <h3>Imperio Romano</h3>
          <p>La defensa perfecta</p>
        </div>

        <div
          className={`imperio-card ${imperio === "Vikingos" ? "selected" : ""}`}
          onClick={() => setImperio("Vikingos")}
        >
          <img src={vikingo} alt="Imperio Vikingo" />
          <h3>Imperio Vikingo</h3>
          <p>El ataque inminente</p>
        </div>

        <div
          className={`imperio-card ${imperio === "Chinos" ? "selected" : ""}`}
          onClick={() => setImperio("Chinos")}
        >
          <img src={chino} alt="Imperio Chino" />
          <h3>Imperio Chino</h3>
          <p>Coordinación inigualable</p>
        </div>

        <div
          className={`imperio-card ${imperio === "Incas" ? "selected" : ""}`}
          onClick={() => setImperio("Incas")}
        >
          <img src={inca} alt="Imperio Inca" />
          <h3>Imperio Inca</h3>
          <p>Velocidad incomparable</p>
        </div>
      </div>

      <div className="acciones">
        <input
          type="number"
          placeholder="ID de partida (opcional)"
          value={idPartida}
          onChange={(e) => setIdPartida(e.target.value)}
        />

        <div className="botones">
          <button onClick={handleBuscarAuto}>Buscar o Unirse Automáticamente</button>
          <button onClick={handleBuscarPorId}>Unirse por ID</button>
        </div>
      </div>

      {mensajeError && <p className="error-msg">{mensajeError}</p>}
    </main>
  );
}
