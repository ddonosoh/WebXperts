import React, { use, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../../css/partida/ludoboard.css";
import Celda from "./Celda";
import Ficha from "./Ficha";
import Mazo from "./Mazo";
import Carta from "./Carta";
import Logger from "./Logger";
import {
  RECORRIDO,
  BASES,
  CENTRO,
  rectaPorImperio,
  inicioPorImperio,
} from "../../../helpers/tableroMap";
import { obtenerCeldaPorPartida } from "../../../js/celda.js";
import { robarCarta } from "../../../js/partida.js";
import { obtenerUltimoTurnoPorIdPartida} from "../../../js/turno.js";
import { obtenerPartidaPorId } from "../../../js/partida.js"; 
import { obtenerFichaPorPartida } from "../../../js/ficha.js";
import { aplicarEfectoCarta } from "../../../js/partida.js"; 

export default function Tablero({ partidaWrapper: partidaWrapperProp }) {
  
  // Hooks de react y router
  const location = useLocation();
  const { idpartida } = useParams();
  const userId = localStorage.getItem("user");

  const [partidaWrapper, setPartidaWrapper] = useState( // Estado de la partida
    partidaWrapperProp ?? location.state?.partida ?? null
  );
  const [celdasBD, setCeldasBD] = useState([]); // Estado de las celdas

  const [fichas, setFichas] = useState([]); // Estado de las fichas
  const [carta, setCarta] = useState([]); // Estado de la carta
  const [turno, setTurno] = useState([]); // Estado del turno

  const [ws, setWs] = useState(null);

  // Cargar Partida desde BD
  useEffect(() => {
    if (!idpartida) return;

    async function fetchPartida() {
      try {
        const data = await obtenerPartidaPorId(idpartida);

        setPartidaWrapper({
          partida: data,
          participa: data.participacion, 
        });
      } catch (error) {
        console.error("Error obteniendo partida:", error);
      }
    }

    fetchPartida();
  }, [idpartida, partidaWrapperProp, location.state]);


  const partida = partidaWrapper?.partida;
  const participa = partidaWrapper?.participa;

  // Cargar celdas desde BD
  useEffect(() => {
    if (!partida) return;

    async function fetchCeldas() {
      try {
        const data = await obtenerCeldaPorPartida(partida.idpartida);
        setCeldasBD(data.celdas || []);
      } catch (err) {
        console.error("Error cargando celdas:", err);
      }
    }

    fetchCeldas();
  }, [partida]);

  // Cargar fichas desde BD
  useEffect(() => {
    if (!partida) return;

    async function fetchFichas() {
      try {
        const data = await obtenerFichaPorPartida(partida.idpartida);
        setFichas(data.fichas || []);
      } catch (err) {
        console.error("Error cargando fichas:", err);
      }
    }

    fetchFichas();
  }, [partida]);

  // Cargar turno desde BD
  useEffect(() => {
    if (!partida) return;

    async function fetchTurno() {
      try {
        const data = await obtenerUltimoTurnoPorIdPartida(partida.idpartida);
        setTurno(data.turno || []);
      } catch (err) {
        console.error("Error al obtener el turno:", err);
      }
    }

    fetchTurno();
  }, [partida]);

  // Robar carta desde el mazo
  async function fetchCarta() {
    try {
      const data = await robarCarta(partida.idpartida);
      setCarta(data.carta);

      // Notificar por WebSocket
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: "accion",
          idpartida: partida.idpartida,
          accion: "robar_carta",
          carta: data.carta,
          userId: userId,
        }));
    }
    } catch (err) {
      console.error("Error al robar carta:", err);
    }
  }

  // Conexión con WebSockets
  useEffect(() => {
    if (!partida) return;

    // Crear la conexión
    const socket = new WebSocket(`ws://localhost:3000/ws`);

    socket.onopen = () => {
      // Unirse a la partida
      socket.send(JSON.stringify({
        type: "join",
        idpartida: partida.idpartida,
        userId: userId
      }));
    };

    // Los mensajes que se envían según el evento
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "accion":
          handleAccionRemota(data);
          break;

        default:
          console.warn("Evento WS desconocido:", data);
      }
    };

    socket.onclose = () => console.log("WS desconectado");

    setWs(socket);

    // Limpiar cuando el componente se desmonta
    return () => socket.close();
  }, [partida]);

  // Mover ficha aplicando efecto de carta
  async function moverFicha(ficha) {
    if (!ficha || !partida) return;

    try {
      const pasos = carta?.valor === "J" ? 4 : null; // De momento, en el caso de que salga J es 4, esto se debe ajustar para recibir cant pasos
      
      //console.log(`Moviendo ficha ${ficha.idficha} con ${pasos ?? "sin pasos"} pasos`);
      
      const res = await aplicarEfectoCarta(partida.idpartida, ficha.idficha, pasos); // Se llama al endpoint que aplica el efecto de la carta (y maneja el movimiento)
      const data = await obtenerFichaPorPartida(partida.idpartida); // Luego de movidas las fichas, se llama al endpoint de GET fichas para refrescarlas
      setFichas(data.fichas || []);

      // Enviar actualización por WebSocket si está abierto
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: "accion",
          idpartida: partida.idpartida,
          accion: "mover_ficha",
          ficha: ficha.idficha,
          userId: userId,
        }));
      }

    } catch (err) {
      console.error("Error moviendo ficha:", err);
    }
  }


  // Si no hay partida (esto es deleteable si no me equivoco)
  if (!partidaWrapper) {
    return (
      <div className="ludo-wrapper">
        <div className="ludo-board-15">
          <p style={{ gridColumn: "1 / -1" }}>No hay datos de partida.</p>
        </div>
      </div>
    );
  }

  // Manejo de acciones recibidas por WS
  function handleAccionRemota(data) {
    const { accion, carta, userId } = data;

    if (accion === "robar_carta") { // Si la acción es robar carta, se setea
      console.log(`Jugador ${userId} robó una carta`);
      setCarta(carta);
    }

    if (accion === "mover_ficha") { // Si la acción es mover_ficha, se setean las fichas
      console.log(`Jugador ${userId} movió una ficha`);
      obtenerFichaPorPartida(partida.idpartida).then((data) => {
        setFichas(data.fichas || []);
      });
    }
  }

  // Función que mapea idcelda a coordenadas del tablero en si mismo
  function obtenerCoordenadas(celdaBD) {
    const { tipo_celda, numero_celda } = celdaBD;

    // Camino normal o seguro
    if (tipo_celda === "normal" || tipo_celda === "segura") {
      const rec = RECORRIDO.find(r => r.n === Number(numero_celda));
      return { r: rec.r, c: rec.c };
    }

    // Inicio jugador 1
    if (tipo_celda === "inicio_jugador1") {
      const bases = inicioPorImperio(participa.tipoimperiouno);
      return bases[Number(numero_celda) - 1];
    }

    // Inicio jugador 2
    if (tipo_celda === "inicio_jugador2") {
      const bases = inicioPorImperio(participa.tipoimperiodos);
      return bases[Number(numero_celda) - 1];
    }

    // Recta final jugador 1
    if (tipo_celda === "rectafinal_jugador1") {
      const recta = rectaPorImperio(participa.tipoimperiouno);
      return recta[Number(numero_celda) - 1];
    }

    // Recta final jugador 2
    if (tipo_celda === "rectafinal_jugador2") {
      const recta = rectaPorImperio(participa.tipoimperiodos);
      return recta[Number(numero_celda) - 1];
    }

    return null;
  }

  const elementos = []; // Render dinámico del tablero completo

  // Zonas de color (elementos de detrás de las celdas)
  elementos.push(
    <div key="zone-azul" className="zone azul" style={{ gridArea: "1 / 1 / 7 / 7" }} />,
    <div key="zone-rojo" className="zone rojo" style={{ gridArea: "1 / 10 / 7 / 16" }} />,
    <div key="zone-amarillo" className="zone amarillo" style={{ gridArea: "10 / 10 / 16 / 16" }} />,
    <div key="zone-verde" className="zone verde" style={{ gridArea: "10 / 1 / 16 / 7" }} />
  );

  // Bases de los jugadores por color (y por ende, de los imperios), no son donde están propiamente tal los jugadores
  const addBase = (color) => {
    BASES[color].forEach(({ r, c }, i) => {
      elementos.push(<Celda key={`base-${color}-${i}`} r={r} c={c} kind={`base ${color}`} />);
    });
  };
  ["azul", "rojo", "amarillo", "verde"].forEach(addBase);

  // Centro del tablero
  elementos.push(<Celda key="centro" r={CENTRO.r} c={CENTRO.c} kind="centro" />);

  // Recorrido propiamente tal
  const tipoPorNumero = (() => {
    const map = new Map();
    for (const c of celdasBD) {
      if (c.tipo_celda === "normal" || c.tipo_celda === "segura") {
        map.set(Number(c.numero_celda), c.tipo_celda);
      }
    }
    return map;
  })();

  RECORRIDO.forEach(({ n, r, c }) => {
    const tipo = tipoPorNumero.get(n) || "camino";
    elementos.push(<Celda key={`rec-${n}`} r={r} c={c} kind={`camino ${tipo}`} label={n} />);
  });

  // Bases de los jugadores propiamente tal (dependiendo del imperio)
  const basesJ1 = inicioPorImperio(participa.tipoimperiouno);
  const basesJ2 = inicioPorImperio(participa.tipoimperiodos);

  for (let i = 1; i <= 4; i++) {
    if (celdasBD.some(c => c.tipo_celda === "inicio_jugador1" && Number(c.numero_celda) === i)) {
      const pos = basesJ1[i - 1];
      elementos.push(<Celda key={`ini1-${i}`} r={pos.r} c={pos.c} kind="inicio j1" />);
    }

    if (celdasBD.some(c => c.tipo_celda === "inicio_jugador2" && Number(c.numero_celda) === i)) {
      const pos = basesJ2[i - 1];
      elementos.push(<Celda key={`ini2-${i}`} r={pos.r} c={pos.c} kind="inicio j2" />);
    }
  }

  // Rectas finales de los jugadores propiamente tal (dependiendo del imperio)
  const rectaJ1 = rectaPorImperio(participa.tipoimperiouno);
  const rectaJ2 = rectaPorImperio(participa.tipoimperiodos);

  rectaJ1.forEach(({ n, r, c }) => {
    if (celdasBD.some(c => c.tipo_celda === "rectafinal_jugador1" && Number(c.numero_celda) === n)) {
      elementos.push(<Celda key={`rf1-${n}`} r={r} c={c} kind="recta recta-j1" label={n} />);
    }
  });

  rectaJ2.forEach(({ n, r, c }) => {
    if (celdasBD.some(c => c.tipo_celda === "rectafinal_jugador2" && Number(c.numero_celda) === n)) {
      elementos.push(<Celda key={`rf2-${n}`} r={r} c={c} kind="recta recta-j2" label={n} />);
    }
  });

  // Fichas de cada jugador (en la celda que le corresponde)
  fichas.forEach((ficha) => {
    const celdaBD = celdasBD.find(c => c.idcelda === ficha.idcelda);
    if (!celdaBD) return;

    const coords = obtenerCoordenadas(celdaBD);
    if (!coords) return;

    elementos.push(
      <Ficha key={`ficha-${ficha.idficha}`} ficha={ficha} r={coords.r} c={coords.c} onSelect={(f) => moverFicha(f)} carta={carta}/>
    );
  });
  

  // Render en si mismo, con los elementos construidps dinámicamente, Logger, Mazo y Carta
  return (
    <div className="ludo-wrapper">
      <div className="ludo-board-15">{elementos}</div>
      <Logger participa={participa} turno={turno}/>
      <Mazo onRobarCarta={fetchCarta} />
      {carta && <Carta carta={carta} />}
    </div>
  );
}
