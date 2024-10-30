import "./Confirmacion.css";
import { useConfirmacion } from "./useConfirmacion";

const Confirmacion = () => {
  const { datosReserva } = useConfirmacion();

  return (
    <div className="confirmacion-container">
      <h1 className="confirmacion-titulo">¡Gracias por tu compra!</h1>
      <p className="confirmacion-mensaje">
        Tu pedido ha sido{" "}
        <strong>{datosReserva.lapTransactionState || "procesado"}</strong>.
      </p>

      <div className="resumen-pedido">
        <h2>Resumen del Pedido</h2>
        <ul className="resumen-lista">
          <li className="resumen-item">
            <strong>Referencia:</strong> {datosReserva.referenceCode}
          </li>
          <li className="resumen-item">
            <strong>Descripción:</strong>{" "}
            {decodeURIComponent(datosReserva.description || "")}
          </li>
          <li className="resumen-item">
            <strong>Estado de la Transacción:</strong> {datosReserva.message}
          </li>
          <li className="resumen-item">
            <strong>Método de Pago:</strong> {datosReserva.lapPaymentMethod}
          </li>
          <li className="resumen-item">
            <strong>Valor Total:</strong> {datosReserva.TX_VALUE}{" "}
            {datosReserva.currency}
          </li>
          <li className="resumen-item">
            <strong>Impuesto:</strong> {datosReserva.TX_TAX}
          </li>
          <li className="resumen-item">
            <strong>ID Transacción:</strong> {datosReserva.transactionId}
          </li>
          <li className="resumen-item">
            <strong>Fecha:</strong> {datosReserva.processingDate}
          </li>
          <li className="resumen-item">
            <strong>Email del Comprador:</strong> {datosReserva.buyerEmail}
          </li>
        </ul>
      </div>

      <button
        className="boton-volver"
        onClick={() => (window.location.href = "/Index")}
      >
        Volver a la tienda
      </button>
    </div>
  );
};

export default Confirmacion;
