import { fetchData } from "./config.js";

// Crear una ficha (solo Admin) (POST)
export async function crearFicha({ idpartida, tipo_imperio, idjugador, idcelda, idcarta }) {
  return fetchData("/fichas/crearficha", {
    method: "POST",
    body: JSON.stringify({ idpartida, tipo_imperio, idjugador, idcelda, idcarta }),
  });
}

// Obtener todas las fichas (GET)
export async function obtenerTodasLasFichas() {
  return fetchData("/fichas/listarfichas", { method: "GET" });
}

// Obtener una ficha por su ID (GET)
export async function obtenerFichaPorId(idficha) {
  return fetchData(`/fichas/${idficha}`, { method: "GET" });
}

// Obtener fichas por su partida (GET)
export async function obtenerFichaPorPartida(idpartida) {
  return fetchData(`/fichas/${idpartida}`, { method: "GET"});
}

// Actualizar una ficha (solo Admin) (PUT)
export async function actualizarFicha(idficha, { idcelda, idcarta }) {
  return fetchData(`/fichas/${idficha}`, {
    method: "PUT",
    body: JSON.stringify({ idcelda, idcarta }),
  });
}

// Eliminar una ficha (solo Admin) (DELETE)
export async function eliminarFicha(idficha) {
  const res = await fetchData(`/fichas/${idficha}`, { method: "DELETE" });
  return res || { mensaje: "Ficha eliminada correctamente" };
}
