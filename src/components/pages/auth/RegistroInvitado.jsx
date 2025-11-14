import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { unirseComoInvitado } from "../../../js/auth.js";
import "../../../css/auth/styleregistro.css";
import soldadoRomano from "../../../img/soldado_romano.jpg";
import soldadoVikingo from "../../../img/soldado_vikingo.webp";
import soldadoChino from "../../../img/soldado_chino.jpg";
import soldadoInca from "../../../img/soldado_incaa.jpg";

export default function PlayAsGuestPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const invitado = await unirseComoInvitado(username);
      localStorage.setItem("tipoJugador", "noregistrado");

      if (invitado?.error) {
        setError(invitado.error);
        return;
      }

      navigate("/homenoregistrado", {
        state: { user: username }
      });

    } catch (err) {
      setError(err.message || "No se pudo iniciar como invitado.");
    }
  };

  return (
    <main className="register-container">
      <div className="side left">
        <div className="empire">
          <h3>Imperio Romano</h3>
          <img src={soldadoRomano} alt="Imperio Romano" />
          <p className="tag red">La defensa perfecta</p>
        </div>
        <div className="empire">
          <h3>Imperio Vikingo</h3>
          <img src={soldadoVikingo} alt="Imperio Vikingo" />
          <p className="tag blue">El ataque inminente</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Jugar Ahora</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de jugador</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button className="submit-btn" type="submit">
            Jugar como invitado
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="side right">
        <div className="empire">
          <h3>Imperio Chino</h3>
          <img src={soldadoChino} alt="Imperio Chino" />
          <p className="tag yellow">Coordinación inigualable</p>
        </div>
        <div className="empire">
          <h3>Imperio Inca</h3>
          <img src={soldadoInca} alt="Imperio Inca" />
          <p className="tag green">Velocidad incomparable</p>
        </div>
      </div>
    </main>
  );
}
