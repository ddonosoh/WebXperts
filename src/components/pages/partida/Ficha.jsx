import { SPRITES, SPRITES_POR_CARTA } from "../../../helpers/fichaSprites";
import { useState, useEffect } from "react";

export default function Ficha({ ficha, r, c, onSelect, carta = null }) {
  const [spriteActual, setSpriteActual] = useState(SPRITES[ficha.tipo_imperio]);

  useEffect(() => {
  
    
    if (ficha.idcarta !== null && carta?.valor) {
      const tipoCarta = carta.valor;
      const nuevoSprite = SPRITES_POR_CARTA[ficha.tipo_imperio]?.[tipoCarta];

      if (nuevoSprite) {
        setSpriteActual(nuevoSprite);
      }
    }
  }, [ficha, carta]);

  const handleClick = () => {
    onSelect?.(ficha);
  };

  return (
    <div
      className="ficha"
      onClick={handleClick}
      style={{
        gridRowStart: r + 1,
        gridColumnStart: c + 1,
      }}
      title={`idficha: ${ficha.idficha}\nidcelda: ${ficha.idcelda}`}
    >
      <img src={spriteActual} alt={ficha.tipo_imperio} className="ficha-img" />
    </div>
  );
}