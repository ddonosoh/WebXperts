import "../../../css/partida/ludoboard.css";
export default function Celda({ r, c, kind = "vacia", label = null, children }) {
  return (
    <div
      className={`cell ${kind}`}
      style={{ gridRowStart: r + 1, gridColumnStart: c + 1 }}
    >
      {label !== null && <span className="cell-number">{label}</span>}
      <div className="cell-content">
        {children}
      </div>
    </div>
  );
}