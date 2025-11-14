import { fetchData } from "./config.js"; // Se importa la función fetchData de config.js

// Registrar un nuevo jugador (POST)
export async function registrar({ username, correo, contrasena, foto, descripcion }) {
  const data = await fetchData("/registro/usuario", {
    method: "POST",
    body: JSON.stringify({ username, correo, contrasena, foto, descripcion }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.persona.userId));

  return data;
}

// Unirse como invitado (POST)
export async function unirseComoInvitado(username) {
  const data = await fetchData("/registro/invitado", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.persona.userId));

  return data;
}

// Login jugador registrado (POST)
export async function login(correo, contrasena) {
  const data = await fetchData("/registro/login", {
    method: "POST",
    body: JSON.stringify({ correo, contrasena }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.usuario.userId));
  return data;
}

// Login administrador (POST)
export async function loginAdmin(correo, contrasena) {
  const data = await fetchData("/registro/loginadmin", {
    method: "POST",
    body: JSON.stringify({ correo, contrasena }),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.usuario.userId));
  return data;
}

// Logout (borra localStorage)
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}