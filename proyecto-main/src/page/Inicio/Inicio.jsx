import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Credenciales'); // Cambia aquí la ruta a la de login
  };

  return (
    <div className="inicio-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Bienvenido a EasyPlanning</h1>
        <p className="hero-description">
          Organiza tus eventos de manera rápida y eficiente. Encuentra los lugares, servicios y paquetes ideales para ti.
        </p>
        <button className="hero-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features">
          <div className="feature">
            <h3>Fácil de usar</h3>
            <p>Interfaz intuitiva para una experiencia fluida.</p>
          </div>
          <div className="feature">
            <h3>Variedad de opciones</h3>
            <p>Encuentra paquetes y servicios que se ajusten a tus necesidades.</p>
          </div>
          <div className="feature">
            <h3>Soporte dedicado</h3>
            <p>Nuestro equipo te acompaña en cada paso.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Nuestros Servicios</h2>
        <p>Explora la variedad de servicios diseñados para ti.</p>
        <div className="services">
          {/* Agrega aquí ítems de servicios con imágenes e información */}
          <div className="service-item">Canchas</div>
          <div className="service-item">Salones</div>
          <div className="service-item">Planificacion</div>
        </div>
      </section>

   

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
        <button className="contact-button" onClick={() => navigate('/Contact')}>
          Contáctenos
        </button>
      </section>
    </div>
  );
};

export default Inicio;
