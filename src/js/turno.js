import { fetchData } from "./config.js";

// Crear turno (solo Admin) (POST)
export async function crearTurno({ idpartida, idjugador, estado_turno, idcarta, idficha }) {
  return fetchData("/turnos/crearturno", {
    method: "POST",
    body: JSON.stringify({ idpartida, idjugador, estado_turno, idcarta, idficha }),
  });
}

// Obtener todos los turnos (GET)
export async function obtenerTodosLosTurnos() {
  return fetchData("/turnos/listarturnos", { method: "GET" });
}

// Obtener un turno por ID (GET)
export async function obtenerTurnoPorId(idturno) {
  return fetchData(`/turnos/${idturno}`, { method: "GET" });
}

export async function obtenerUltimoTurnoPorIdPartida(idpartida) {
  return fetchData(`/turnos/partida/${idpartida}`, { method: "GET" });
}

// Actualizar un turno (solo Admin) (PUT)
export async function actualizarTurno(idturno, datosActualizados) {
  return fetchData(`/turnos/${idturno}`, {
    method: "PUT",
    body: JSON.stringify(datosActualizados),
  });
}

// Eliminar un turno (solo Admin) (DELETE)
export async function eliminarTurno(idturno) {
  const res = await fetchData(`/turnos/${idturno}`, { method: "DELETE" });
  return res || { mensaje: "Turno eliminado correctamente" };
}
