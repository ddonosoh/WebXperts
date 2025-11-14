import { useState } from "react";
import EsAdmin from "../../../hooks/esAdmin";
import { verUsuario } from "../../../js/admin";
import "../../../css/admin/styleverusuario.css";

export default function VerUsuario() {
  EsAdmin();

  const [inputId, setInputId] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuscar = async (e) => {
    e.preventDefault();

    if (!inputId.trim()) {
      setError("Debe ingresar un ID válido.");
      return;
    }

    setLoading(true);
    setError("");
    setMensaje("");
    setUsuario(null);

    try {
      const data = await verUsuario(inputId);

      if (data?.error) {
        setError(data.error);
      } else {
        setUsuario(data.usuario);
        setMensaje(data.mensaje);
      }
    } catch (err) {
      setError("Error al obtener información del usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ver-usuario-container">
      <h1>Buscar Usuario</h1>

      <form className="buscar-form" onSubmit={handleBuscar}>
        <input
          type="number"
          placeholder="Ingrese ID de usuario..."
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p className="loading-msg">Cargando información...</p>}
      {error && <p className="error-msg">{error}</p>}
      {mensaje && <p className="success-msg">{mensaje}</p>}

      {!usuario ? null : (
        <div className="usuario-wrapper">
          <section className="usuario-card">
            <div className="usuario-foto">
              {usuario.foto ? (
                <img src={usuario.foto} alt="Foto usuario" />
              ) : (
                <div className="no-foto">Sin foto</div>
              )}
            </div>

            <div className="usuario-info">
              <h2>{usuario.username}</h2>
              <p><strong>ID:</strong> {usuario.userId}</p>
              <p><strong>Correo:</strong> {usuario.correo}</p>
              <p><strong>Estado de cuenta:</strong> {usuario.estado_cuenta}</p>
              <p><strong>Descripción:</strong> {usuario.descripcion || "Sin descripción"}</p>
            </div>
          </section>

          <section className="stats-card">
            <h3>Estadísticas del Jugador</h3>

            <div className="stats-grid">
              <div className="stat-item">
                <span>Partidas Totales</span>
                <strong>{usuario.total_partidas}</strong>
              </div>

              <div className="stat-item">
                <span>Ganadas</span>
                <strong>{usuario.partidas_ganadas}</strong>
              </div>

              <div className="stat-item">
                <span>Abandonadas</span>
                <strong>{usuario.partidas_abandonadas}</strong>
              </div>

              <div className="stat-item">
                <span>Tasa Abandono</span>
                <strong>{usuario.tasa_abandonos}</strong>
              </div>

              <div className="stat-item">
                <span>Puntos</span>
                <strong>{usuario.puntos}</strong>
              </div>

              <div className={`stat-item ${usuario.puntos_anormales ? "alerta" : ""}`}>
                <span>Ratio (Pts / esperados)</span>
                <strong>{usuario.ratio_puntos}</strong>
              </div>
            </div>

            {usuario.puntos_anormales && (
              <p className="alerta-msg">Este jugador presenta puntos anormales.</p>
            )}
          </section>

          <section className="tabla-section">
            <h3>Historial de Cartas Especiales</h3>

            {usuario.historial_cartas_especiales.length === 0 ? (
              <p className="no-data">No se encontraron cartas especiales.</p>
            ) : (
              <table className="tabla-detalle">
                <thead>
                  <tr>
                    <th>ID Partida</th>
                    <th>Turno</th>
                    <th>Valor Carta</th>
                  </tr>
                </thead>
                <tbody>
                  {usuario.historial_cartas_especiales.map((c, idx) => (
                    <tr key={idx}>
                      <td>{c.idpartida}</td>
                      <td>{c.numero_turno}</td>
                      <td>{c.valor_carta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="tabla-section">
            <h3>Partidas Ganadas</h3>
            <p className="stat-simple">
              Este jugador ha ganado <strong>{usuario.partidas_ganadas}</strong> partidas.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
