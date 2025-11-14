import { useEffect, useState } from "react";
import { obtenerTodosLosAdmins } from "../../../js/admin.js";
import EsAdmin from "../../../hooks/esAdmin";
import "../../../css/admin/stylelistaradmins.css";

export default function ListarAdminPage() {
  
  EsAdmin();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarAdmins = async () => {
      try {
        const data = await obtenerTodosLosAdmins();

        if (data?.error) {
          setError(data.error);
        } else {
          setAdmins(data);
        }
      } catch (err) {
        setError("Error al obtener administradores.");
      } finally {
        setLoading(false);
      }
    };

    cargarAdmins();
  }, []);

  if (loading) return <p className="loading-admins">Cargando administradores...</p>;
  if (error) return <p className="error-admins">{error}</p>;

  return (
    <main className="listar-admins-container">
      <h1>Lista de Administradores</h1>

      <table className="admins-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Fecha Creación</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.userId}>
              <td>{admin.userId}</td>
              <td>{admin.correo}</td>
              <td>{new Date(admin.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}