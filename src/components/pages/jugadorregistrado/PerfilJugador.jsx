import "../../../css/jugadorregistrado/styleperfiljugador.css";
import { useState, useEffect } from "react";
import {
  getJugadorRegistradoUserId,
  updateJugadorRegistrado,
  obtenerRangoGlobalHistorialdePartidas,
} from "../../../js/jugadorRegistrado.js";
import { obtenerPersonaPorId } from "../../../js/persona.js";
import EsJugadorRegistrado from "../../../hooks/esJugadorRegistrado";


export default function PerfilJugador() {
  
  EsJugadorRegistrado();
  
  const [persona, setPersona] = useState({});
  const [jugador, setJugador] = useState({});
  const [stats, setStats] = useState({});
  const [form, setForm] = useState({ username: "", descripcion: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  const userId = localStorage.getItem("user");

  useEffect(() => {
    if (!userId) {
      setError("No se encontró el ID del usuario en el token.");
      return;
    }

    const cargarDatos = async () => {
      try {
        const personaData = await obtenerPersonaPorId(userId);
        const jugadorData = await getJugadorRegistradoUserId(userId);
        const statsData = await obtenerRangoGlobalHistorialdePartidas();

        setPersona(personaData || {});
        setJugador(jugadorData || {});
        setStats(statsData || {});
        setForm({
          username: personaData?.username || "",
          descripcion: jugadorData?.descripcion || "",
        });
      } catch (err) {
        setError(err.message || "Error al cargar el perfil.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await updateJugadorRegistrado({
        username: form.username,
        descripcion: form.descripcion,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      setMensaje(res.mensaje || "Perfil actualizado correctamente.");
      setPersona((prev) => ({ ...prev, username: form.username }));
      setJugador((prev) => ({
        ...prev,
        descripcion: form.descripcion,
      }));
    } catch (err) {
      setError(err.message || "Error al actualizar el perfil.");
    }
  };

  if (cargando) return <p className="loading">Cargando perfil...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <main className="perfil-container">
      <h1>Perfil del Jugador</h1>

      <section className="perfil-info">
        <div className="perfil-foto">
          {jugador.foto ? (
            <img src={jugador.foto} alt="Foto de perfil" />
          ) : (
            <div className="foto-placeholder">Sin foto</div>
          )}
        </div>

        <div className="perfil-datos">
          <p><strong>Username:</strong> {persona.username}</p>
          <p><strong>Correo:</strong> {jugador.correo || "No disponible"}</p>
          <p><strong>Descripción:</strong> {jugador.descripcion || "Sin descripción"}</p>
          <p><strong>Puntos:</strong> {jugador.puntos ?? 0}</p>
          <p><strong>Estado de cuenta:</strong> {jugador.estado_cuenta || "Activa"}</p>
        </div>
      </section>

      <section className="perfil-editar">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>Nuevo Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nuevo nombre de usuario"
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Escribe algo sobre ti..."
          />

          <button type="submit">Guardar Cambios</button>
        </form>

        {mensaje && <p className="success-msg">{mensaje}</p>}
        {error && <p className="error-msg">{error}</p>}
      </section>

      <section className="perfil-estadisticas">
        <h2>Estadísticas Globales</h2>
        <p><strong>Rango Global:</strong> {stats?.rango_global ?? "No disponible"}</p>
        <p><strong>Partidas Jugadas:</strong> {stats?.total_partidas ?? 0}</p>
        <p><strong>Victorias:</strong> {stats?.victorias ?? 0}</p>
        <p><strong>Derrotas:</strong> {stats?.derrotas ?? 0}</p>
      </section>
    </main>
  );
}
