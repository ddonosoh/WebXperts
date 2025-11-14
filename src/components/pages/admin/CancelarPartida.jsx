import { useState } from "react";
import EsAdmin from "../../../hooks/esAdmin";
import { cancelarPartida } from "../../../js/admin.js";
import "../../../css/admin/stylecancelarpartida.css";

export default function CancelarPartida() {

  EsAdmin();

  const [idpartida, setIdPartida] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleCancelar = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!idpartida.trim() || !comentario.trim()) {
      setError("Debes ingresar el ID de partida y un comentario.");
      return;
    }

    setLoading(true);
    try {
      const data = await cancelarPartida(idpartida, comentario);

      if (data?.error) {
        setError(data.error);
      } else {
        setMensaje(data.mensaje);
      }

    } catch (err) {
      setError("Error al cancelar la partida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cancelar-partida-container">
      <h1>Cancelar Partida</h1>

      <form className="cancelar-form" onSubmit={handleCancelar}>
        <label>ID de la Partida</label>
        <input
          type="number"
          placeholder="Ejemplo: 12"
          value={idpartida}
          onChange={(e) => setIdPartida(e.target.value)}
        />

        <label>Comentario del Administrador</label>
        <textarea
          placeholder="Motivo de cancelación..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cancelando..." : "Cancelar Partida"}
        </button>
      </form>

      {error && <p className="error-cancelar">{error}</p>}
      {mensaje && <p className="success-cancelar">{mensaje}</p>}
    </main>
  );
}
