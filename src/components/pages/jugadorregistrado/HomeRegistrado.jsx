import { useEffect, useState } from "react";
import "../../../css/jugadorregistrado/stylehomeregistrado.css";
import { useNavigate, useLocation } from "react-router-dom";
import EsJugadorRegistrado from "../../../hooks/esJugadorRegistrado";
import fotoPerfil from "../../../img/avatar.webp";
import {
  getJugadorRegistradoUserId,
  obtenerRangoGlobalHistorialdePartidas,
} from "../../../js/jugadorRegistrado.js";

export default function HomeRegistrado() {
  EsJugadorRegistrado();

  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.user || "Jugador";
  const userId = localStorage.getItem("user");

  const [descripcion, setDescripcion] = useState("");
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const jugadorData = await getJugadorRegistradoUserId(userId);
        const statsData = await obtenerRangoGlobalHistorialdePartidas();

        setDescripcion(jugadorData?.descripcion || "");
        setStats(statsData || {});
      } catch (err) {
        setError("Error al cargar la información del jugador.");
      } finally {
        setCargando(false);
      }
    };

    if (userId) cargarDatos();
  }, [userId]);

  if (cargando) return <p className="loading">Cargando información...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <main className="home-registrado-container">
      <div className="left-section">
        <h1 className="nombre-usuario">{username}</h1>

        <img
          src={fotoPerfil}
          alt={`Foto de ${username}`}
          className="foto-perfil"
        />

        <p className="descripcion">{descripcion || ""}</p>

        <div className="botones-perfil">
          <button onClick={() => navigate("/perfil")} className="btn-editar">
            Editar Perfil
          </button>
          <button
            onClick={() => navigate("/seleccionar-imperio")}
            className="btn-jugar"
          >
            Jugar
          </button>
        </div>
      </div>

      <div className="right-section">
        <h2>Estadísticas Globales</h2>
        <div className="estadisticas">
          <p><strong>Rango Global:</strong> {stats?.rango_global ?? "No disponible"}</p>
          <p><strong>Partidas Jugadas:</strong> {stats?.total_partidas ?? 0}</p>
          <p><strong>Victorias:</strong> {stats?.victorias ?? 0}</p>
          <p><strong>Derrotas:</strong> {stats?.derrotas ?? 0}</p>
        </div>
      </div>
    </main>
  );
}

