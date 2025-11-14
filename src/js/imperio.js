import { fetchData } from "./config.js";

// Crear un imperio (solo Admin) (POST)
export async function crearImperio(tipo_imperio) {
  return fetchData("/imperios/crearimperio", {
    method: "POST",
    body: JSON.stringify({ tipo_imperio }),
  });
}

// Obtener todos los imperios (GET)
export async function obtenerTodosLosImperios() {
  return fetchData("/imperios/listarimperios", { method: "GET" });
}

// Obtener un imperio por su nombre/ID (GET)
export async function obtenerImperioPorId(tipo_imperio) {
  return fetchData(`/imperios/${tipo_imperio}`, { method: "GET" });
}

// Actualizar un imperio (solo Admin) (PUT)
export async function actualizarImperio(tipo_imperio, nuevo_tipo_imperio) {
  return fetchData(`/imperios/${tipo_imperio}`, {
    method: "PUT",
    body: JSON.stringify({ nuevo_tipo_imperio }),
  });
}

// Eliminar un imperio (solo Admin) (DELETE)
export async function eliminarImperio(tipo_imperio) {
  const res = await fetchData(`/imperios/${tipo_imperio}`, { method: "DELETE" });
  return res || { mensaje: "Imperio eliminado correctamente" };
}
