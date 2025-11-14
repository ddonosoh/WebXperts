import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/admin/stylecrearadmin.css";
import EsAdmin from "../../../hooks/esAdmin";
import { crearAdministrador } from "../../../js/admin.js";

export default function CrearAdmin() {
  
  EsAdmin();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    correo: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await crearAdministrador(form);

      if (res?.error) {
        setError(res.error);
        return;
      }

      setMensaje("Administrador creado correctamente.");

      setForm({ username: "", correo: "", contrasena: "" });

      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setError(err.message || "Error al crear administrador.");
    }
  };

  return (
    <main className="crear-admin-container">
      <h1>Crear Nuevo Administrador</h1>

      <form className="crear-admin-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <label>Correo electrónico</label>
        <input
          name="correo"
          value={form.correo}
          onChange={handleChange}
          type="email"
        />

        <label>Contraseña</label>
        <input
          name="contrasena"
          value={form.contrasena}
          onChange={handleChange}
          type="password"
        />

        <button type="submit">Crear Administrador</button>

        {mensaje && <p className="success-msg">{mensaje}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </main>
  );
}
