import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js

// Crear carta (POST)
export async function crearCarta(idpartida, valor) {
  return fetchData("/cartas/crearcarta", {
    method: "POST",
    body: JSON.stringify({ idpartida, valor }),
  });
}

// Obtener todas las cartas (GET)
export async function obtenerTodasLasCartas() {
  return fetchData("/cartas/vertodaslascartas", { method: "GET" });
}

// Obtener carta por ID (GET)
export async function obtenerCartaPorId(idcarta) {
  return fetchData(`/cartas/${idcarta}`, { method: "GET" });
}

// Actualizar carta (PUT)
export async function actualizarCarta(idcarta, datos) {
  return fetchData(`/cartas/${idcarta}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
}

// Eliminar carta (DELETE)
export async function eliminarCarta(idcarta) {
  const res = await fetchData(`/cartas/${idcarta}`, { method: "DELETE" });
  return res || { mensaje: "Carta eliminada correctamente" };
}
