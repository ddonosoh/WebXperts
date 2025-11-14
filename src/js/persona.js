import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js
import { logout } from "./auth.js"; // Se importa logout de auth.js

// Crear nueva persona (POST)
export async function crearPersona(username) {
  return fetchData("/personas/crearpersona", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}

// Obtener todas las personas (GET)
export async function obtenerTodasLasPersonas() {
  return fetchData("/personas/vertodaslaspersonas");
}

// Obtener una persona por userId (GET)
export async function obtenerPersonaPorId(userId) {
  return fetchData(`/personas/${userId}`);
}

// Actualizar una persona (PUT)
export async function actualizarPersona(userId, username) {
  return fetchData(`/personas/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ username }),
  });
}

// Eliminar una persona (DELETE)
export async function eliminarPersona(userId) {
  const res = await fetchData(`/personas/${userId}`, { method: "DELETE" });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (currentUser && String(currentUser) === String(userId)) {
    logout();
  }

  return res === null ? { mensaje: "Persona eliminada correctamente" } : res;
}