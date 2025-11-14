import { Link } from "react-router-dom";
import "../../css/static/stylehome.css";
import { useNavigate, useLocation } from "react-router-dom";
export default function Header() {
  const estaLoggeado = Boolean(localStorage.getItem("token"));
  const tipoJugador = localStorage.getItem("tipoJugador");
  const navigate = useNavigate();
  const logout = async() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tipoJugador");
    navigate("/");
  }
  return (
    <header>
      <div className="logo">Imperio Ludo</div>
      <nav>
        <ul>
          <li>
            <Link
              to={
                !estaLoggeado
                  ? "/"
                  : tipoJugador === "registrado"
                  ? "/homeregistrado"
                  : tipoJugador === "noregistrado"
                  ? "/homenoregistrado"
                  : tipoJugador === "admin"
                  ? "/admin"
                  : "/"
              }
            >
              Inicio
            </Link>
          </li>
          <li><Link to="/acercade">Acerca de</Link></li>
          <li><Link to="/instrucciones">Instrucciones</Link></li>
          {!estaLoggeado && (
          <>
            <li><Link to="/login" className="login">Iniciar sesión</Link></li>
            <li><Link to="/login-admin" className="login">Iniciar sesión como Administrador</Link></li>
          </>)}
          {estaLoggeado && (
          <>
          <li>
            <button className="logout" onClick={logout}>Cerrar Sesión</button>
          </li>
          </>)}

        </ul>
      </nav>
    </header>
  );
}
