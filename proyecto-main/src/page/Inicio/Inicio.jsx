import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Inicio.css';
import { API_BASE_URL } from '../../environment'; // Asegúrate de que esta ruta sea correcta

const Inicio = () => {
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/local/get`); // Cambia la ruta según tu API
        setLugares(response.data);
      } catch (error) {
        console.error('Error al obtener los lugares de la base de datos', error);
      }
    };
    fetchLugares();
  }, []);

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
          <div className="service-item">Planificación</div>
        </div>
      </section>

      {/* Lugares Section */}
      <section className="lugares-section">
        <h2>Lugares Disponibles</h2>
        <div className="lugares-container2">
          {lugares.length > 0 ? (
            lugares.map((lugar) => (
              <div key={lugar.idLocal} className="lugar-item">
                <h3>{lugar.nombre}</h3>
                <p>{lugar.descripcion}</p>
                <p>{lugar.ubicacion}</p>
                <button className="btn btn-primary" onClick={handleLoginClick}>
                  ¡RESERVA AHORA!
                </button>
              </div>
            ))
          ) : (
            <p>No hay lugares disponibles en este momento.</p>
          )}
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
