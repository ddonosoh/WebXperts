import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js
import { logout } from "./auth.js"; // Se importa logout de auth.js

// Obtener todos los jugadores registrados (GET)
export async function getAllJugadorRegistrado() {
  return fetchData("/jugadorregistrados/vertodoslosjugadoresregistrados");
}

// Obtener un jugador por su ID (GET)
export async function getJugadorRegistradoUserId(userId) {
  return fetchData(`/jugadorregistrados/${userId}`);
}

// Actualizar perfil del jugador autenticado (PUT)
export async function updateJugadorRegistrado({ username, foto, descripcion }) {
  return fetchData("/jugadorregistrados/actualizarjugadorregistrado", {
    method: "PUT",
    body: JSON.stringify({ username, foto, descripcion }),
  });
}

// Eliminar la cuenta del jugador autenticado (DELETE)
export async function deleteJugadorRegistrado() { // OJO: Delete porque delete no se puede
  const data = await fetchData("/jugadorregistrados/eliminarmicuenta", {
    method: "DELETE",
  });

  logout();
  return data;
}

// Obtener estadísticas y rango global (GET)
export async function obtenerRangoGlobalHistorialdePartidas() {
  return fetchData("/jugadorregistrados/estadisticas");
}