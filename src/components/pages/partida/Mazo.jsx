import { DADO_VUELTA_SPRITE } from "../../../helpers/cartaSprites";
import "../../../css/partida/mazo.css";
export default function Mazo({ onRobarCarta}) {
  return (
    <div className="mazo" onClick = {onRobarCarta}>
      <img
        src={DADO_VUELTA_SPRITE}
        alt="Mazo"
        className="mazo-img"
      />
    </div>
  );
}