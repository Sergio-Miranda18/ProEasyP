import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Inicio.css';
import { API_BASE_URL } from '../../environment';

const Inicio = () => {
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/local/get`);
        setLugares(response.data);
      } catch (error) {
        console.error('Error al obtener los lugares de la base de datos', error);
      }
    };
    fetchLugares();

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    });

    const elements = document.querySelectorAll('.features-section, .services-section, .lugares-section, .contact-section');
    elements.forEach((element) => observer.observe(element));
  }, []);

  const handleLoginClick = () => {
    navigate('/Credenciales');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMouseEnter = (nombre) => {
    const filteredLugares = lugares.filter((lugar) => lugar.nombre.toLowerCase() === nombre.toLowerCase());
    setModalContent(filteredLugares);
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
    setModalContent([]);
  };

  return (
    <div className={`inicio-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="hero-section">
        <h1 className="hero-title">Bienvenido a EasyPlanning</h1>
        <p className="hero-description">
          Organiza tus eventos de manera rápida y eficiente. Encuentra los lugares, servicios y paquetes ideales para ti.
        </p>
        <button className="hero-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      </div>

      <section className="features-section scroll-animation">
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

      <section className="services-section scroll-animation">
        <h2>Nuestros Servicios</h2>
        <p>Explora la variedad de servicios diseñados para ti.</p>
        <div className="services">
          <div
            className="service-item"
            onMouseEnter={() => handleMouseEnter('Cancha')}
            onMouseLeave={handleMouseLeave}
          >
            Canchas
          </div>
          <div
            className="service-item"
            onMouseEnter={() => handleMouseEnter('Salon')}
            onMouseLeave={handleMouseLeave}
          >
            Salones
          </div>
          <div
            className="service-item"
            onMouseEnter={() => handleMouseEnter('Planificación')}
            onMouseLeave={handleMouseLeave}
          >
            Planificación
          </div>
        </div>
      </section>

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

      <section className="contact-section scroll-animation">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>
        <button className="contact-button" onClick={() => navigate('/ContactUs')}>
          Contáctenos
        </button>
      </section>

      <div className="top-controls">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Opciones disponibles:</h3>
            {modalContent.length > 0 ? (
              modalContent.map((item) => (
                <div key={item.idLocal}>
                  <h4>{item.nombre}</h4>
                  <p>{item.descripcion}</p>
                </div>
              ))
            ) : (
              <p>No hay elementos disponibles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
