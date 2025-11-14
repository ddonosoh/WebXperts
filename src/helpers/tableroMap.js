// Variables globales para la creación del tablero de Ludo


// Variable recorrido para el viaje que ejerce cada ficha (Esto en el fondo indica el numero, fila, columna) de las fichas de juego, lo cual es constante para todas las partidas
// Lo únicos elementos que varían son las celdas seguras

export const RECORRIDO = [
  { n: 1,  r: 6,  c: 1 },
  { n: 2,  r: 6,  c: 2 },
  { n: 3,  r: 6,  c: 3 },
  { n: 4,  r: 6,  c: 4 },
  { n: 5,  r: 6,  c: 5 },
  { n: 6,  r: 5, c: 6 },
  { n: 7,  r: 4, c: 6 },
  { n: 8,  r: 3, c: 6 },
  { n: 9,  r: 2, c: 6 },
  { n: 10,  r: 1, c: 6 },
  { n: 11,  r: 0, c: 6 },
  { n: 12,  r: 0, c: 7 },
  { n: 13,  r: 0, c: 8 },
  { n: 14,  r: 1, c: 8 },
  { n: 15,  r: 2, c: 8 },
  { n: 16,  r: 3, c: 8 },
  { n: 17,  r: 4, c: 8 },
  { n: 18,  r: 5, c: 8 },
  { n: 19,  r: 6, c: 9 },
  { n: 20,  r: 6, c: 10 },
  { n: 21,  r: 6, c: 11 },
  { n: 22,  r: 6, c: 12 },
  { n: 23,  r: 6, c: 13 },
  { n: 24,  r: 6, c: 14 },
  { n: 25,  r: 7, c: 14 },
  { n: 26,  r: 8, c: 14 },
  { n: 27,  r: 8, c: 13 },
  { n: 28,  r: 8, c: 12 },
  { n: 29,  r: 8, c: 11 },
  { n: 30,  r: 8, c: 10 },
  { n: 31,  r: 8, c: 9 },
  { n: 32,  r: 9, c: 8 },
  { n: 33,  r: 10, c: 8 },
  { n: 34,  r: 11, c: 8 },
  { n: 35,  r: 12, c: 8 },
  { n: 36,  r: 13, c: 8 },
  { n: 37,  r: 14, c: 8 },
  { n: 38,  r: 14, c: 7 },
  { n: 39,  r: 14, c: 6 },
  { n: 40,  r: 13, c: 6 },
  { n: 41,  r: 12, c: 6 },
  { n: 42,  r: 11, c: 6 },
  { n: 43,  r: 10, c: 6 },
  { n: 44,  r: 9, c: 6 },
  { n: 45,  r: 8, c: 5 },
  { n: 46,  r: 8, c: 4 },
  { n: 47,  r: 8, c: 3 },
  { n: 48,  r: 8, c: 2 },
  { n: 49,  r: 8, c: 1 },
  { n: 50,  r: 8, c: 0 },
  { n: 51,  r: 7, c: 0 },
  { n: 52,  r: 6, c: 0 },
];

// Rectas finales por cada color (o imperio). Esto depende de que imperio hayan escogido cada jugador, y ahi se muestran sus rectas finales
export const RECTAFINAL_AZUL = [
  { n: 1, r: 7, c: 1 }, { n: 2, r: 7, c: 2 }, { n: 3, r: 7, c: 3 },
  { n: 4, r: 7, c: 4 }, { n: 5, r: 7, c: 5 }, { n: 6, r: 7, c: 6 },
];

export const RECTAFINAL_ROJO = [
  { n: 1, r: 1, c: 7 }, { n: 2, r: 2, c: 7 }, { n: 3, r: 3, c: 7 },
  { n: 4, r: 4, c: 7 }, { n: 5, r: 5, c: 7 }, { n: 6, r: 6, c: 7 },
];

export const RECTAFINAL_VERDE = [
  { n: 1, r: 13, c: 7 }, { n: 2, r: 12, c: 7 }, { n: 3, r: 11, c: 7 },
  { n: 4, r: 10, c: 7 }, { n: 5, r: 9, c: 7 }, { n: 6, r: 8, c: 7 },
];

export const RECTAFINAL_AMARILLO = [
  { n: 1, r: 13, c: 7 }, { n: 2, r: 12, c: 7 }, { n: 3, r: 11, c: 7 },
  { n: 4, r: 10, c: 7 }, { n: 5, r: 9, c: 7 }, { n: 6, r: 8, c: 7 },
];

// Celdas de bases por cada color. Esto depende de que imperio hayan escogido cada jugador, y ahi se muestran sus bases
export const BASES = {
  azul:     [ {r:1,c:1},{r:1,c:4},{r:4,c:1},{r:4,c:4} ],
  rojo:     [ {r:1,c:10},{r:1,c:13},{r:4,c:10},{r:4,c:13} ],
  verde: [ {r:10,c:10},{r:10,c:13},{r:13,c:10},{r:13,c:13} ],
  amarillo:    [ {r:10,c:1},{r:10,c:4},{r:13,c:1},{r:13,c:4} ],
};

export const CENTRO = { r: 7, c: 7 }; // No es necesario y no afecta en términos de juego, pero es un elementos visual que vale la pena colocar

// Función que mapea el color de la recta final con su Imperio correspondiente
export function rectaPorImperio(nombre) {
  switch (nombre) {
    case "Vikingos": return RECTAFINAL_AZUL;
    case "Romanos":  return RECTAFINAL_ROJO;
    case "Chinos":   return RECTAFINAL_VERDE;
    case "Incas":    return RECTAFINAL_AMARILLO;
    default:         return RECTAFINAL_AZUL;
  }
}

// Función que mapea el color de las bases con su Imperio correspondiente
export function inicioPorImperio(nombre) {
  switch (nombre) {
    case "Vikingos": return BASES.azul;
    case "Romanos":  return BASES.rojo;
    case "Chinos":   return BASES.verde;
    case "Incas":    return BASES.amarillo;
    default:         return BASES.azul;
  }
}