import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Función que sirve para proteger rutas exclusivas del Admin
export default function EsAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    // No hay token, se manda a landing page
    if (!token || !userId) {
      alert("Debes iniciar sesión como administrador para acceder a esta sección.");
      navigate("/");
      return;
    }

    const verificarAdmin = async () => {
      try {
        const res = await fetch(`https://webxperts-back-252s2-y0rk.onrender.com/admins/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // No es admin, se manda a landing page
        if (res.status !== 200) {
          alert("No tienes permisos para acceder al panel de administración.");
          navigate("/");
        }

      } catch (error) {
        // Cualquier error, a landing page
        alert("Error verificando permisos. Inicia sesión nuevamente.");
        navigate("/");
      }
    };

    verificarAdmin();
  }, [navigate]);
}
