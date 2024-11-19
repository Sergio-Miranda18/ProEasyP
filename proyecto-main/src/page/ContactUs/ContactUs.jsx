import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUs.css';  // Asegúrate de que tu archivo CSS está importado correctamente.
import Favicon from 'react-favicon';

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-us-container">
      {/* Botón Atrás */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Atrás
      </button>

      <h1 className="welcome-message">¡Bienvenido a nuestra página de contacto!</h1>
      
      <div className="contact-boxes">
        {/* Recuadro para email */}
        <div className="contact-box">
          <h2>Reclamos y Consultas</h2>
          <p>
            Para cualquier reclamo o consulta, por favor comuníquese a nuestro correo: 
            <strong> easyplanning2024@gmail.com</strong>
          </p>
          <button className="copy-button" onClick={() => navigator.clipboard.writeText('soporte@easyplanning.com')}>
            Copiar Email
          </button>
        </div>

        <Favicon url="/images/eas.png" />
        
        {/* Recuadro para redes sociales */}
        <div className="contact-box">
          <h2>Chatea con nosotros aquí</h2>
          <p>Conéctate con nosotros a través de nuestras redes sociales:</p>
          <div className="social-icons">
            <a href="https://wa.me/message/4JPY4TQIGO2XN1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567854211544&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/easyplanning_reserves/profilecard/?igsh=ZWxoejB0Z241dGZu" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
