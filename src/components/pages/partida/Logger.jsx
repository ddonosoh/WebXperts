import "../../../css/partida/logger.css";

export default function Logger({ participa, turno }) {
  let imperioActual;
  if (Number(turno.numero_turno) % 2 === 0) {
    imperioActual = participa.tipoimperiouno;
  } 
   else if (Number(turno.numero_turno) % 2 !== 0) {
    imperioActual = participa.tipoimperiodos;
  }
  else {
    console.log("Error al determinar el imperio actual");
  }
  return (

    <div className="logger">
      <h2 className={`turno-text ${imperioActual}`}>
        Es tu turno, <span>{imperioActual}</span> ⚔️
      </h2>
    </div>
  );
}