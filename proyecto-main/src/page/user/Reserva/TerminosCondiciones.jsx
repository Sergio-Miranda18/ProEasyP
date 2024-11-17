import React from 'react';
import "./TerminosCondiciones.css"; // Importa el archivo CSS

const TerminosCondiciones = () => {
  return (
    <div className="titulo">
      <h1 className="titulo">Términos y Condiciones</h1>
      
      <div className="card">
        <div className="card-content">
          <h2 className="card-header">1. Política de Tratamiento de Datos</h2>
          <p className="card-text">En cumplimiento con las normativas vigentes de protección de datos personales, nos comprometemos a:</p>
          <ul className="card-list">
            <li className="card-list-item">Proteger la confidencialidad de los datos proporcionados por nuestros usuarios.</li>
            <li className="card-list-item">Implementar medidas de seguridad técnicas y organizativas apropiadas.</li>
            <li className="card-list-item">No compartir información personal con terceros sin consentimiento explícito.</li>
            <li className="card-list-item">Almacenar datos en servidores seguros con protección contra accesos no autorizados.</li>
            <li className="card-list-item">Mantener los datos solo durante el tiempo necesario para los fines especificados.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="card-header">2. Política de Reservas y Cancelaciones</h2>
          <div className="card-warning">
            <strong>Importante:</strong> Al realizar una reserva, el usuario acepta expresamente que en caso de cancelación, no se realizarán reembolsos del monto pagado.
          </div>
          <p className="card-text">Esta política se establece debido a:</p>
          <ul className="card-list">
            <li className="card-list-item">Los costos operativos y administrativos asociados a cada reserva.</li>
            <li className="card-list-item">El bloqueo de disponibilidad que impide ofrecer el servicio a otros clientes potenciales.</li>
            <li className="card-list-item">La necesidad de mantener un sistema de reservas eficiente y responsable.</li>
            <li className="card-list-item">Los gastos de gestión y procesamiento de pagos incurridos.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="card-header">3. Uso de la Plataforma</h2>
          <p className="card-text">Al utilizar nuestra plataforma, los usuarios se comprometen a:</p>
          <ul className="card-list">
            <li className="card-list-item">Proporcionar información veraz y actualizada.</li>
            <li className="card-list-item">No realizar reservas fraudulentas o especulativas.</li>
            <li className="card-list-item">Respetar los horarios y condiciones establecidas.</li>
            <li className="card-list-item">Mantener la confidencialidad de sus credenciales de acceso.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="card-header">4. Limitación de Responsabilidad</h2>
          <p className="card-text">La empresa se reserva el derecho de:</p>
          <ul className="card-list">
            <li className="card-list-item">Modificar estos términos y condiciones en cualquier momento.</li>
            <li className="card-list-item">Cancelar reservas que incumplan estas políticas.</li>
            <li className="card-list-item">Tomar acciones legales en caso de uso fraudulento.</li>
            <li className="card-list-item">Realizar mantenimientos programados de la plataforma.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="card-header">5. Aceptación de Términos</h2>
          <p className="card-text">
            Al utilizar nuestros servicios, el usuario declara haber leído, entendido y aceptado todos los términos 
            y condiciones aquí establecidos. El desconocimiento de estos términos no exime de su cumplimiento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
