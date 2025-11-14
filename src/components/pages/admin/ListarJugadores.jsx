import { useEffect, useState } from "react";
import EsAdmin from "../../../hooks/esAdmin";
import { listarJugadores } from "../../../js/admin";
import "../../../css/admin/stylelistarjugadores.css";

export default function ListarJugadores() {

  EsAdmin();

  const [filtros, setFiltros] = useState({
    correo: "",
    username: "",
    estado: "",
    puntos_min: "",
    puntos_max: "",
  });

  const [jugadoresR, setJugadoresR] = useState([]);
  const [jugadoresNR, setJugadoresNR] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cargarJugadores = async () => {
    setLoading(true);
    setError("");
    setMensaje("");

    try {
      const data = await listarJugadores(filtros);

      if (data?.error) {
        setError(data.error);
      } else {
        setMensaje(data.mensaje);
        setJugadoresR(data.jugadores_registrados || []);
        setJugadoresNR(data.jugadores_no_registrados || []);
      }
    } catch (err) {
      setError("Error al obtener jugadores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarJugadores();
  }, []);

  const handleInput = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <main className="listar-jugadores-container">
      <h1>Listado de Jugadores</h1>

      <div className="filtros-jugadores">
        <div className="filtro-item">
          <label>Correo:</label>
          <input
            name="correo"
            value={filtros.correo}
            onChange={handleInput}
          />
        </div>

        <div className="filtro-item">
          <label>Username:</label>
          <input
            name="username"
            value={filtros.username}
            onChange={handleInput}
          />
        </div>

        <div className="filtro-item">
          <label>Estado:</label>
          <select name="estado" value={filtros.estado} onChange={handleInput}>
            <option value="">Todos</option>
            <option value="Activo">Activo</option>
            <option value="Baneado">Baneado</option>
          </select>
        </div>

        <div className="filtro-item">
          <label>Puntos mínimo:</label>
          <input
            type="number"
            name="puntos_min"
            value={filtros.puntos_min}
            onChange={handleInput}
          />
        </div>

        <div className="filtro-item">
          <label>Puntos máximo:</label>
          <input
            type="number"
            name="puntos_max"
            value={filtros.puntos_max}
            onChange={handleInput}
          />
        </div>

        <button className="btn-filtros" onClick={cargarJugadores}>
          Aplicar Filtros
        </button>
      </div>

      {loading && <p className="loading-jugadores">Cargando jugadores...</p>}
      {error && <p className="error-jugadores">{error}</p>}
      {mensaje && <p className="success-jugadores">{mensaje}</p>}

      <h2 className="subtitulo">Jugadores Registrados</h2>
      <table className="jugadores-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Correo</th>
            <th>Puntos</th>
            <th>Estado</th>
            <th>Ganadas</th>
            <th>Tasa Abandono</th>
            <th>Puntos Anormales</th>
            <th>Razón</th>
          </tr>
        </thead>

        <tbody>
          {jugadoresR.map((j) => (
            <tr key={j.userId}>
              <td>{j.userId}</td>
              <td>{j.username}</td>
              <td>{j.correo}</td>
              <td>{j.puntos}</td>
              <td>{j.estado_cuenta}</td>
              <td>{j.partidas_ganadas}</td>
              <td>{j.tasa_abandonos}%</td>
              <td className={j.puntos_anormales ? "alerta" : ""}>
                {j.puntos_anormales ? "Sí" : "—"}
              </td>
              <td>{j.razon_puntos ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="subtitulo">Jugadores No Registrados</h2>
      <table className="jugadores-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Ganadas</th>
            <th>Tasa Abandono</th>
          </tr>
        </thead>

        <tbody>
          {jugadoresNR.map((j) => (
            <tr key={j.userId}>
              <td>{j.userId}</td>
              <td>{j.username}</td>
              <td>{j.partidas_ganadas}</td>
              <td>{j.tasa_abandonos}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
