import { useState } from "react";
import EsAdmin from "../../../hooks/esAdmin";
import { verUsuario, editarUsuario } from "../../../js/admin";
import "../../../css/admin/styleeditarusuario.css";

export default function EditarUsuario() {
  EsAdmin();

  const [idBuscar, setIdBuscar] = useState("");
  const [usuario, setUsuario] = useState(null);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    correo: "",
    contrasena: "",
    descripcion: "",
    puntos: "",
    estado_cuenta: "",
  });

  const buscarUsuario = async () => {
    setMensaje("");
    setError("");

    if (!idBuscar.trim()) {
      setError("Debes ingresar un ID válido.");
      return;
    }

    setLoading(true);
    try {
      const data = await verUsuario(idBuscar);

      if (data?.error) {
        setError(data.error);
        setUsuario(null);
        return;
      }

      setUsuario(data.usuario);
      setMensaje("Usuario encontrado correctamente.");
      setForm({
        username: data.usuario.username || "",
        correo: data.usuario.correo || "",
        contrasena: "",
        descripcion: data.usuario.descripcion || "",
        puntos: data.usuario.puntos ?? "",
        estado_cuenta: data.usuario.estado_cuenta || "",
      });
    } catch (e) {
      setError("Error al buscar usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    const camposAEnviar = {};
    for (const key in form) {
      if (form[key] !== "" && form[key] !== null) camposAEnviar[key] = form[key];
    }

    try {
      const data = await editarUsuario(idBuscar, camposAEnviar);

      if (data?.error) {
        setError(data.error);
        return;
      }

      setMensaje("Usuario actualizado correctamente.");
    } catch (e) {
      setError("Error al editar usuario.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="editar-usuario-container">
      <h1>Editar Usuario</h1>

      <div className="buscar-box">
        <input
          type="number"
          placeholder="ID del usuario"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />
        <button onClick={buscarUsuario}>Buscar</button>
      </div>

      {loading && <p className="loading-msg">Cargando...</p>}
      {error && <p className="error-msg">{error}</p>}
      {mensaje && <p className="success-msg">{mensaje}</p>}

      {usuario && (
        <form className="editar-form" onSubmit={handleSubmit}>
          <h2>Editando a {usuario.username}</h2>

          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} />

          <label>Correo</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} />

          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="contrasena"
            placeholder="••••••••"
            value={form.contrasena}
            onChange={handleChange}
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />

          <label>Puntos</label>
          <input
            type="number"
            name="puntos"
            value={form.puntos}
            onChange={handleChange}
          />

          <label>Estado de Cuenta</label>
          <select
            name="estado_cuenta"
            value={form.estado_cuenta}
            onChange={handleChange}
          >
            <option value="">-- Seleccionar --</option>
            <option value="Activo">Activo</option>
            <option value="Baneado">Baneado</option>
          </select>

          <button className="guardar-btn" type="submit">
            Guardar Cambios
          </button>
        </form>
      )}
    </main>
  );
}
