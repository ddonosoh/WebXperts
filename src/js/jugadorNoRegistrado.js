import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js
import { logout } from "./auth.js"; // Se importa logout de auth.js

// Obtener todos los jugadores no registrados (GET)
export async function getAllNoRegistrados() {
  return fetchData("/jugadornoregistrados/vertodoslosjugadoresnoregistrados", {
    method: "GET",
  });
}

// Obtener un jugador no registrado por ID (GET)
export async function getNoRegistradoById(userId) {
  return fetchData(`/jugadornoregistrados/${userId}`, {
    method: "GET",
  });
}

// Actualizar nombre de usuario (requiere token) (PUT)
export async function updateNoRegistrado(username) {
  return fetchData("/jugadornoregistrados/actualizarjugadornoregistrado", {
    method: "PUT",
    body: JSON.stringify({ username }),
  });
}

// Eliminar cuenta (requiere token) (DELETE)
export async function deleteNoRegistrado() {
  const data = await fetchData("/jugadornoregistrados/eliminarmicuenta", {
    method: "DELETE",
  });
  logout();
  return data;
}
