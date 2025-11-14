import { useEffect, useState } from "react";
import { listarPartidas } from "../../../js/admin.js";
import EsAdmin from "../../../hooks/esAdmin";
import "../../../css/admin/stylelistarpartidas.css";

export default function ListarPartidas() {

  EsAdmin();

  const [estado, setEstado] = useState("activa");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cargarPartidas = async () => {
    setLoading(true);
    setError("");
    setMensaje("");

    try {
      const data = await listarPartidas({ estado, fecha_creacion: fechaCreacion || null, fecha_finalizacion: fechaFinalizacion || null});

      if (data?.error) {
        setError(data.error);
      } else {
        setMensaje(data.mensaje);
        setPartidas(data.partidas || []);
      }
    } catch (err) {
      setError("Error al obtener partidas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPartidas();
  }, [estado]);

  return (
    <main className="listar-partidas-container">
      <h1>Listado de Partidas</h1>

      <div className="filtros-partidas">
        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="activa">Activa</option>
          <option value="esperando">Esperando</option>
          <option value="finalizada">Finalizada</option>
        </select>

        <label>Fecha desde:</label>
        <input
          type="date"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />

        <label>Fecha hasta:</label>
        <input
          type="date"
          value={fechaFinalizacion}
          onChange={(e) => setFechaFinalizacion(e.target.value)}
        />

        <button onClick={cargarPartidas}>Aplicar Filtros</button>
      </div>

      {loading && <p className="loading-partidas">Cargando partidas...</p>}
      {error && <p className="error-partidas">{error}</p>}
      {mensaje && <p className="success-partidas">{mensaje}</p>}

      <table className="partidas-table">
        <thead>
          <tr>
            <th>ID Partida</th>
            <th>Estado</th>
            <th>Turno Actual</th>
            <th>Fecha Creación</th>
            <th>Fecha Finalización</th>

            <th>ID Jugador 1</th>
            <th>Username J1</th>
            <th>Tipo J1</th>
            <th>Imperio J1</th>

            <th>ID Jugador 2</th>
            <th>Username J2</th>
            <th>Tipo J2</th>
            <th>Imperio J2</th>
          </tr>
        </thead>

        <tbody>
          {partidas.map((p) => (
            <tr key={p.idpartida}>
              <td>{p.idpartida}</td>
              <td>{p.estado_partida}</td>
              <td>{p.turno_actual}</td>

              <td>{new Date(p.fecha_creacion).toLocaleString()}</td>

              <td>
                {p.fecha_finalizacion
                  ? new Date(p.fecha_finalizacion).toLocaleString()
                  : "—"}
              </td>

              <td>{p.jugador_uno?.userId ?? "—"}</td>
              <td>{p.jugador_uno?.username ?? "—"}</td>
              <td>{p.jugador_uno?.tipo ?? "—"}</td>
              <td>{p.imperios?.imperio_jugador_uno ?? "—"}</td>

              <td>{p.jugador_dos?.userId ?? "—"}</td>
              <td>{p.jugador_dos?.username ?? "—"}</td>
              <td>{p.jugador_dos?.tipo ?? "—"}</td>
              <td>{p.imperios?.imperio_jugador_dos ?? "—"}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </main>
  );
}
