import "../../../css/static/styleabout.css";
import fotoVicho from "../../../img/foto_vicho.jpg";
import fotoDario from "../../../img/foto_dario.jpg";
import fotoLukas from "../../../img/foto_lukas.jpg";

export default function AboutPage() {
  return (
    <main className="about-container">
      <section className="how-to-play">
        <h1>Información</h1>
        <ul>
          <li>Tienes 3 opciones iniciales ingresar como Administrador, como jugador registrado (registrandote o iniciando sesion) o como jugador anonimo</li>
          <li>Como jugador registrado tienes el beneficio de escoger tu imperio y poder unirte a partidas de amigos. Junto a lo anterior tendras un perfil de jugador y un historial de partidas</li>
          <li>Cuando ya hayas ingresado podras buscar una partida</li>
          <li>Ya en la partida solo queda divertirse</li>
        </ul>

        <h1>Reglas del juego</h1>
        <ul>
          <li>El juego es mediante turnos</li>
          <li>Cuando comienza tu turno debes seleccionar una carta la cual debes usarla en tu turno</li>
          <li>El objetivo del juego es que tus 4 piezas lleguen a la base de tu color, dando la vuelta por todo el tablero</li>
          <li>Para mover tus piezas de la base te debe salir la carta con el numero 6</li>
          <li>Cada carta tiene una funcion distinta, los numeros son la cantidad de casillas que puedes avanzar, la J es (...), la Q es un escudo, el K es una espada y el Joquer es (...)</li>
          <li>Si caes en una casilla ocupada por una pieza rival, la pieza rival vuelve a su base</li>
          <li>El escudo te protege si una pieza enemiga llega a tu casilla, no te envia a la base, a menos que tenga espada</li>
          <li>La espada te permite enviar a la base a un enemigo inclusive con escudo si llegas a su casilla </li>
          <li>Solo puedes aplicar las cartas a las piezas fuera de la base</li>
          <li>El primer jugador en llevar sus 4 piezas a la base gana la partida</li>
        </ul>

        <h2>Reglas de la J por imperio</h2>
        <ul>
          <li>Imperio Romano: Corresponde a un escudo</li>
          <li>Imperio Vikingo: Corresponde a una espada</li>
          <li>Imperio Chino: Todas las piezas fuera de la base avanzan 4 casillas</li>
          <li>Imperio Inca: Una pieza puede avanzar 10 casillas</li>
        </ul>


      </section>

      <section className="about-team">
        <h1>Acerca de nosotros</h1>
        <div className="team">
          <div className="member">
            <img src={fotoVicho} alt="Vicente" />
            <div className="info">
              <h3>Vicente Soto</h3>
              <p className="email">vsotg@uc.cl</p>
            </div>
            <p className="desc">
              Alumno de ingeniería civil industrial, futuro creador de videojuegos en Rockstar Games! :D
            </p>
          </div>

          <div className="member">
            <img src={fotoDario} alt="Darío Donoso" />
            <div className="info">
              <h3>Darío Donoso</h3>
              <p className="email">ddonosoh@uc.cl</p>
            </div>
            <p className="desc">
              Alumno de ingeniería civil matematica, fan del Software y futuro desarrollador de videojuegos en Ubisoft!
            </p>
          </div>

          <div className="member">
            <img src={fotoLukas} alt="Lukas Carvallo" />
            <div className="info">
              <h3>Lukas Carvallo</h3>
              <p className="email">lukas.carvallo@uc.cl</p>
            </div>
            <p className="desc">
              Alumno de ingeniería civil industrial y amante del deporte.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
