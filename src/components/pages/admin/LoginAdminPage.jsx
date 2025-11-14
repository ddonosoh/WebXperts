import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginAdmin } from "../../../js/auth.js";
import "../../../css/auth/styleregistro.css";

export default function LoginAdminPage() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(correo, contrasena);
      localStorage.setItem("tipoJugador", "admin"); //ojo
      setMensaje(res.mensaje || "Inicio de sesión como Administrador exitoso");
      setTimeout(() => {
        navigate("/admin", { state: { user: res.usuario?.username || res.usuario?.correo } });

      }, 800);
    } catch (error) {
      setMensaje("Error: " + error.message);
    }
  };

  return (
    <main className="register-container">
      <div className="form-card">
        <h2>Iniciar Sesión como Administrador</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <button className="submit-btn" type="submit">
            Ingresar
          </button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </main>
  );
}
