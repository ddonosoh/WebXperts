import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { salirseDePartidaEnEspera } from "../../../js/partida.js";
import { iniciarPartida } from "../../../js/partida.js";
import "../../../css/partida/stylematchmaking.css";

export default function Matchmaking() {
  
  // Hooks del react router
  const location = useLocation();
  const navigate = useNavigate();

  // Estado inicial de la partida
  const [partidaWrapper, setPartidaWrapper] = useState(location.state?.partida);

  const partida = partidaWrapper?.partida;
  const participa = partidaWrapper?.participa;
  const idusuario = localStorage.getItem("user"); // Id del jugador logueado
  const [mensaje, setMensaje] = useState("");
  const [debugVisible, setDebugVisible] = useState(true);

  const wsRef = useRef(null); // Referencia al websocket

  // Conecta al cliente al WebSocket del server
  useEffect(() => {
    if (!partidaWrapper) return;

    const ws = new WebSocket("wss://webxperts-back-252s2-y0rk.onrender.com/ws");
    wsRef.current = ws;

    // Al abrir la conexión WS, se une a la partida
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          idpartida: partida.idpartida,
          userId: idusuario,
        })
      );
    };

    // Se escuchan mensajes del servidor WS
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      // Notificación de nuevo jugador
      if (data.type === "jugador_join") {
        setMensaje(`Jugador con ID ${data.userId} se unió a la partida`);
      }

      // Ambos jugadors están aqui, se inicia la partida
      if (data.type === "match_complete") {
        if (idusuario == partida.idjugadoruno){
            await iniciarPartida(partida.idpartida); // Solo el jugador uno inicia, para mantener la integridad de la DB
            navigate(`/partida/${partida.idpartida}`, {
              state: { partida: partidaWrapper }
            });
        } 

        else if (idusuario == partida.idjugadordos){
            navigate(`/partida/${partida.idpartida}`, { // El jugador 2 solo navega a la partida
              state: { partida: partidaWrapper }
            });
        }
      }
    };

    // Se cierra la conexión al desmontar el componente
    return () => ws.close();
  }, [partidaWrapper]);

  // Si no hay datos de partida
  if (!partidaWrapper) {
    return (
      <main className="matchmaking-container">
        <h1>Matchmaking</h1>
        <p className="matchmaking-mensaje error">No se recibió información de la partida.</p>
      </main>
    );
  }

  // Se verifica si hay dos jugadores en la partida
  const tieneDosJugadores = partida.idjugadordos !== null;

  // Permite salir de la sala de espera
  const handleSalir = async () => {
    try {
      const res = await salirseDePartidaEnEspera(partida.idpartida); // Se llama al endpoint que permite salirse de la partida
      setMensaje(res.message);
      navigate("/homenoregistrado");
    } catch (error) {
      setMensaje(error.message || "Error al salir de la partida.");
    }
  };

  // Render
  return (
    <main className="matchmaking-container">
      <h1>Matchmaking</h1>

      {mensaje && (
        <p className={`matchmaking-mensaje ${mensaje.includes("Error") ? "error" : "ok"}`}>
          {mensaje}
        </p>
      )}

      <p><strong>ID Partida:</strong> {partida.idpartida}</p>
      <p><strong>Estado:</strong> {partida.estado_partida}</p>
      <p><strong>Jugador 1:</strong> {partida.idjugadoruno}</p>
      <p><strong>Jugador 2:</strong> {partida.idjugadordos ?? "Esperando oponente..."}</p>

      {!tieneDosJugadores && (
        <button className="salir-btn" onClick={handleSalir}>
          Salir de la partida
        </button>
      )}
    </main>
  );
}
