import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js
import { logout } from "./auth.js"; // Se importa logout de auth.js

// CRUDS ADMINS

// Crear un nuevo administrador (POST), requiere token de otro admin
export async function crearAdministrador({ username, correo, contrasena }) {
  return fetchData("/admins/crearadmin", {
    method: "POST",
    body: JSON.stringify({ username, correo, contrasena }),
  });
}

// Obtener todos los administradores (GET)
export async function obtenerTodosLosAdmins() {
  return fetchData("/admins/vertodoslosadmins");
}

// Obtener un administrador específico (GET)
export async function obtenerAdminPorId(userId) {
  return fetchData(`/admins/${userId}`);
}

// Actualizar username del administrador autenticado (PUT)
export async function actualizarAdmin(username) {
  return fetchData("/admins/actualizaradmin", {
    method: "PUT",
    body: JSON.stringify({ username }),
  });
}

// Eliminar administrador por userId (DELETE)
export async function eliminarAdmin(userId) {
  const data = await fetchData(`/admins/${userId}`, {
    method: "DELETE",
  });

  // IMPORTANTE: Si se eliminó su propia cuenta, limpiar sesión local
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (String(currentUser) === String(userId)) {
    logout();
  }

  return data;
}

// Listar partidas (GET) con filtros: estado, fecha_creacion, fecha_finalizacion
export async function listarPartidas({ estado, fecha_creacion, fecha_finalizacion }) {
  const params = new URLSearchParams({ estado });
  if (fecha_creacion) params.append("fecha_creacion", fecha_creacion);
  if (fecha_finalizacion) params.append("fecha_finalizacion", fecha_finalizacion);

  return fetchData(`/admins/listarpartidas?${params.toString()}`);
}

// Cancelar una partida (PATCH)
export async function cancelarPartida(idpartida, comentario_admin) {
  const params = new URLSearchParams({ idpartida });
  return fetchData(`/admins/cancelarpartida?${params.toString()}`, {
    method: "PATCH",
    body: JSON.stringify({ comentario_admin }),
  });
}

// GESTIÓN

// Listar jugadores con filtros opcionales (GET)
export async function listarJugadores({ correo, username, estado, puntos_min, puntos_max } = {}) {
  const params = new URLSearchParams();
  if (correo) params.append("correo", correo);
  if (username) params.append("username", username);
  if (estado) params.append("estado", estado);
  if (puntos_min) params.append("puntos_min", puntos_min);
  if (puntos_max) params.append("puntos_max", puntos_max);

  return fetchData(`/admins/listarjugadores?${params.toString()}`);
}

// Ver información detallada de un jugador (GET)
export async function verUsuario(idusuariover) {
  return fetchData(`/admins/verusuario/${idusuariover}`);
}

// Editar usuario registrado (PUT)
export async function editarUsuario(idusuarioeditar, campos) {
  return fetchData(`/admins/editarusuario/${idusuarioeditar}`, {
    method: "PUT",
    body: JSON.stringify(campos),
  });
}

