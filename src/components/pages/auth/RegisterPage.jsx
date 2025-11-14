import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrar } from "../../../js/auth.js";
import "../../../css/auth/styleregistro.css";
import soldadoRomano from "../../../img/soldado_romano.jpg";
import soldadoVikingo from "../../../img/soldado_vikingo.webp";
import soldadoChino from "../../../img/soldado_chino.jpg";
import soldadoInca from "../../../img/soldado_incaa.jpg";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registrar({
        username: form.username,
        correo: form.correo,
        contrasena: form.contrasena,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }
      
      navigate("/homeregistrado", { state: { user: res.usuario || form.username } });
    } catch (err) {
      setError(err.message || "Error inesperado al registrar usuario");
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
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input name="username" onChange={handleChange} required />

          <label>Correo electrónico</label>
          <input name="correo" type="email" onChange={handleChange} required />

          <label>Contraseña</label>
          <input name="contrasena" type="password" onChange={handleChange} required />

          <button className="submit-btn" type="submit">
            Crear Cuenta
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
