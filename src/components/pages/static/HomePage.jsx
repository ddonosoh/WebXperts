import "../../../css/static/stylehome.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="overlay">
        <h1>IMPERIO LUDO</h1>
        <h2>Conquista tu tablero</h2>
        <p className="description">
          Lidera tu imperio hacia la victoria asignando espadas y escudos.<br />
          Elige entre Romano, Inca, Chino y Vikingo, demuestra que tu estrategia es la mejor.
        </p>
        <div className="buttons">
          <Link to="/registrarse-como-invitado" className="play">¡Jugar ahora!</Link>
          <Link to="/registrarse" className="register">Registrarme</Link>
        </div>
        <div className="features">
          <span>Multijugador</span>
          <span>Sin descargas</span>
          <span>Gratis</span>
        </div>
      </div>
    </section>
  );
}
