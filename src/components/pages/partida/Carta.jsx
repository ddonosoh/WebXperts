import { CARTASSPRITES } from "../../../helpers/cartaSprites";
import "../../../css/partida/carta.css";

export default function Carta({ carta }) {
  return (
    <div className="carta">
      <img
        src={CARTASSPRITES[carta.valor]}
        alt={carta.valor}
        className="carta-robada"
      />
    </div>
  );
}