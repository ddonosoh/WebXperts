export const API_URL = "https://webxperts-back-252s2-y0rk.onrender.com"; // URL base de la API (Eventualmente hay que cambiarla por la de Render)

// Función genérica para peticiones con fetch, solo se le pasa el endpoint y options (headers, body, etc)
export async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem("token"); // Se pide el token de local storage (si es que existe)

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Headers de autorización
  };

  const res = await fetch(`${API_URL}${endpoint}`, { // Se hace fetch concatenando la URL de la API
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });

  // Se intenta leer el body siempre como JSON
  const data = await res.json().catch(() => ({}));

  // Si la respuesta tiene error (status no 200 y algo)
  if (!res.ok) {
    // Extrae el mensaje de error desde tu backend
    const mensaje = data.error || data.message || `Error HTTP ${res.status}`;
    throw new Error(mensaje);
  }

  // Si no hay contenido (ejemplo DELETE exitoso)
  if (res.status === 204) return null;

  // Si todo fue bien, retorna los datos del backend
  return data;
}
