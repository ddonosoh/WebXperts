import { useNavigate } from "react-router-dom";
import "../../../css/admin/stylepaneladmin.css";
import EsAdmin from "../../../hooks/esAdmin";

export default function PanelAdmin() {
  
  EsAdmin();

  const navigate = useNavigate();

  return (
    <main className="admin-panel-container">
      <h1>Panel de Administración</h1>
      <p className="admin-sub">Bienvenido Administrador — Selecciona una acción</p>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/crear-admin")}>
          Crear Nuevo Administrador
        </button>

        <button onClick={() => navigate("/admin/listar-admins")}>
          Listar Administradores
        </button>

        <button onClick={() => navigate("/admin/listar-partidas")}>
          Listar Partidas
        </button>

        <button onClick={() => navigate("/admin/cancelar-partida")}>
          Cancelar Partida
        </button>

        <button onClick={() => navigate("/admin/listar-jugadores")}>
          Listar Jugadores (con filtros)
        </button>

        <button onClick={() => navigate("/admin/ver-usuario")}>
          Ver Información de Usuario
        </button>

        <button onClick={() => navigate("/admin/editar-usuario")}>
          Editar Usuario Registrado
        </button>
      </div>
    </main>
  );
}
