// Inicio.jsx
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
      <div className="inicio-content">
        <h1 className="inicio-title">Bienvenido a EasyPlanning</h1>
        <p className="inicio-description">
  Organiza tus eventos de manera rápida y eficiente. Encuentra los lugares, servicios y paquetes diseñados especialmente para ti. 
  Si deseas conocer más sobre nosotros y descubrir todo lo que ofrecemos, te invitamos a registrarte o iniciar sesión.
</p>

        <button className="inicio-button" onClick={handleLoginClick}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Inicio;
