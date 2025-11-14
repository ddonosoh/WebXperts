import { fetchData } from "./config.js"; // Usa tu helper genérico

// Crear una celda (solo Admin) (POST)
export async function crearCelda({ idpartida, numero_celda, tipo_celda, x, y }) {
  return fetchData("/celdas/crearcelda", {
    method: "POST",
    body: JSON.stringify({ idpartida, numero_celda, tipo_celda, x, y }),
  });
}

// Obtener todas las celdas (GET)
export async function obtenerTodasLasCeldas() {
  return fetchData("/celdas/listarceldas", { method: "GET" });
}

// Obtener una celda por su ID (GET)
export async function obtenerCeldaPorId(idcelda) {
  return fetchData(`/celdas/${idcelda}`, { method: "GET" });
}

// Obtener celdas por su partida (GET)
export async function obtenerCeldaPorPartida(idpartida) {
  return fetchData(`/celdas/${idpartida}`, { method: "GET"});
}

// Actualizar una celda (solo Admin) (PUT)
export async function actualizarCelda(idcelda, { numero_celda, tipo_celda, x, y }) {
  return fetchData(`/celdas/${idcelda}`, {
    method: "PUT",
    body: JSON.stringify({ numero_celda, tipo_celda, x, y }),
  });
}

// Eliminar una celda (solo Admin) (DELETE)
export async function eliminarCelda(idcelda) {
  const res = await fetchData(`/celdas/${idcelda}`, { method: "DELETE" });
  return res || { mensaje: "Celda eliminada correctamente" };
}
