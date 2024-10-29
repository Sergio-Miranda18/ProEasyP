// Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="inicio-container">
      <div className="inicio-content">
        <h1 className="inicio-title">Bienvenido a EasyPlanning</h1>
        <p className="inicio-description">
          Organiza tus eventos de forma rápida y eficiente. Encuentra lugares, servicios y paquetes diseñados para tus necesidades.
        </p>
        <button className="inicio-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Inicio;
