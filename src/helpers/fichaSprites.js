import vikingoQ from "../img/elementosjuego/soldados/soldado_vikingo_escudo.png";
import vikingoK from "../img/elementosjuego/soldados/soldado_vikingo_espada.png";
import vikingoJK from "../img/elementosjuego/soldados/soldado_vikingo_espada.png";

import romanoQ from "../img/elementosjuego/soldados/soldado_romano_escudo.png";
import romanoK from "../img/elementosjuego/soldados/soldado_romano_espada.png";
import romanoJK from "../img/elementosjuego/soldados/soldado_romano_escudo.png";

import chinoQ from "../img/elementosjuego/soldados/soldado_chino_escudo.png";
import chinoK from "../img/elementosjuego/soldados/soldado_chino_espada.png";

import incaQ from "../img/elementosjuego/soldados/soldado_incaa_escudo.png";
import incaK from "../img/elementosjuego/soldados/soldado_incaa_espada.png";

import vikingo from "../img/elementosjuego/soldados/soldado_vikingo.png";
import romano from "../img/elementosjuego/soldados/soldado_romano.png";
import chino from "../img/elementosjuego/soldados/soldado_chino.png";
import inca from "../img/elementosjuego/soldados/soldado_incaa.png";

// Mapear imperio con sus Sprites iniciales, la llave corresponde al tipo de imperio (idéntico en la DB) y el valor es el sprite
export const SPRITES = {
  Vikingos: vikingo,
  Romanos: romano,
  Chinos: chino,
  Incas: inca,
};

// Mapear imperio y carta especial con sus Sprites de combate
export const SPRITES_POR_CARTA = {
  Vikingos: {
    "Q": vikingoQ,   
    "K": vikingoK,  
    "Joker": vikingoJK, 
  },
  Romanos: {
    "Q": romanoQ,
    "K": romanoK,
    "Joker": romanoJK,
  },
  Chinos: {
    "Q": chinoQ,
    "K": chinoK,

  },
  Incas: {
    "Q": incaQ,
    "K": incaK,
  },
};