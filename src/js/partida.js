import { fetchData } from "./config.js";

// Jugador Registrado: crear o unirse automáticamente (POST)
export async function buscarOParticiparRegistrado(tipo_imperio) {
  return fetchData("/partidas/buscarregistrado", {
    method: "POST",
    body: JSON.stringify({ tipo_imperio }),
  });
}

// Jugador Registrado: unirse por ID (POST)
export async function buscarOParticiparRegistradoconIdPartida(idpartida, tipo_imperio) {
  return fetchData("/partidas/buscarregistradoconidpartida", {
    method: "POST",
    body: JSON.stringify({ idpartida, tipo_imperio }),
  });
}

// Jugador No Registrado: crear o unirse automáticamente (POST)
export async function buscarOParticiparNoRegistrado() {
  return fetchData("/partidas/buscarnoregistrado", { method: "POST" });
}

// Salirse de partida en estado "esperando" (DELETE)
export async function salirseDePartidaEnEspera(idpartida) {
  return fetchData("/partidas/eliminarpartidaenespera", {
    method: "DELETE",
    body: JSON.stringify({ idpartida }),
  });
}

// Desconectarse de partida activa (abandono) (PATCH)
export async function desconectarPartidaEnCurso() {
  return fetchData("/partidas/salir", { method: "PATCH" });
}

// Iniciar partida (solo lo puede hacer jugador 1) (POST)
export async function iniciarPartida(idpartida) {
  return fetchData(`/partidas/${idpartida}/iniciar`, { method: "POST" });
}

// Robar carta en turno actual (PATCH)
export async function robarCarta(idpartida) {
  return fetchData(`/partidas/${idpartida}/robarcarta`, { method: "PATCH" });
}

// Aplicar efecto carta (mover ficha) (PATCH)
export async function aplicarEfectoCarta(idpartida, idficha, cantPasos = null) {
  const body = { idficha };
  if (cantPasos !== null) body.cantPasos = cantPasos;
  return fetchData(`/partidas/${idpartida}/play`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// Listar todas las partidas (GET)
export async function listarPartidas() {
  return fetchData("/partidas/listarpartidas", { method: "GET" });
}

// Obtener partida por ID (GET)
export async function obtenerPartidaPorId(idpartida) {
  return fetchData(`/partidas/${idpartida}`, { method: "GET" });
}

// Eliminar partida (admin o debug) (DELETE)
export async function eliminarPartida(idpartida) {
  return fetchData(`/partidas/${idpartida}`, { method: "DELETE" });
}
