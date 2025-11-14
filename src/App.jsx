import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import HomePage from "./components/pages/static/HomePage.jsx";
import AboutPage from "./components/pages/static/AboutPage.jsx";
import LoginPage from "./components/pages/auth/LoginPage.jsx";
import RegisterPage from "./components/pages/auth/RegisterPage.jsx";
import RegistroInvitado from "./components/pages/auth/RegistroInvitado.jsx";
import SeleccionarImperio from "./components/pages/jugadorregistrado/SeleccionarImperioPage.jsx";
import HomeRegistrado from "./components/pages/jugadorregistrado/HomeRegistrado.jsx";
import HomeNoRegistrado from "./components/pages/jugadornoregistrado/HomeNoRegistrado.jsx";
import Matchmaking from "./components/pages/partida/Matchmaking.jsx";
import Tablero from "./components/pages/partida/Tablero.jsx";
import PerfilJugador from "./components/pages/jugadorregistrado/PerfilJugador.jsx";
import PanelAdmin from "./components/pages/admin/PanelAdmin.jsx";
import CrearAdmin from "./components/pages/admin/CrearAdmin.jsx";
import LoginAdmin from "./components/pages/admin/LoginAdminPage.jsx";
import ListarAdmins from "./components/pages/admin/ListarAdminPage.jsx";
import ListarPartidas from "./components/pages/admin/ListarPartidas.jsx";
import CancelarPartida from "./components/pages/admin/CancelarPartida.jsx";
import ListarJugadores from "./components/pages/admin/ListarJugadores.jsx";
import VerUsuario from "./components/pages/admin/VerUsuario.jsx";
import EditarUsuario from "./components/pages/admin/EditarUsuario.jsx";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Pagínas generales */}
        <Route path="/" element={<HomePage />} />
        <Route path="/acercade" element={<AboutPage />} />

        {/* No registrados */}
        <Route path="/registrarse-como-invitado" element={<RegistroInvitado />} />
        <Route path="/homenoregistrado" element={<HomeNoRegistrado />} />

        {/* Registrados */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
        <Route path="/seleccionar-imperio" element={<SeleccionarImperio />} />
        <Route path="/homeregistrado" element={<HomeRegistrado />} />
        
        <Route path="/perfil" element={<PerfilJugador />} />
        
        {/* Admin */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route path="/admin/crear-admin" element={<CrearAdmin />} />
        <Route path="/admin/listar-admins" element={<ListarAdmins />} />
        <Route path="/admin/listar-partidas" element={<ListarPartidas />} />
        <Route path="/admin/cancelar-partida" element={<CancelarPartida />} />
        <Route path="/admin/listar-jugadores" element={<ListarJugadores />} />
        <Route path="/admin/ver-usuario" element={<VerUsuario />} />
        <Route path="/admin/editar-usuario" element={<EditarUsuario />} />

        {/* Partida */}
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/partida/:idpartida" element={<Tablero />} />
       
      </Routes>
    </Router>
  );
}
