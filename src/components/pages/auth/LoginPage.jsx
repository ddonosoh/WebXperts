import { useState } from "react";
import { login } from "../../../js/auth.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../css/auth/styleregistro.css";
import soldadoRomano from "../../../img/soldado_romano.jpg";
import soldadoVikingo from "../../../img/soldado_vikingo.webp";
import soldadoChino from "../../../img/soldado_chino.jpg";
import soldadoInca from "../../../img/soldado_incaa.jpg";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(correo, contrasena);
      setMensaje(res.mensaje || "Inicio de sesión exitoso");
      localStorage.setItem("tipoJugador", "registrado"); //ojo
      localStorage.setItem("usuario", JSON.stringify(res.usuario));
      setTimeout(() => {
        navigate("/homeregistrado", { state: { user: res.usuario?.username || res.usuario?.correo } });

      }, 800);

    } catch (error) {
      setMensaje("Error: " + (error.message || "no se pudo iniciar sesión"));
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
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="usuario@correo.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />

          <button className="submit-btn" type="submit">
            Ingresar
          </button>
        </form>

        {mensaje && <p className="info-msg">{mensaje}</p>}
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