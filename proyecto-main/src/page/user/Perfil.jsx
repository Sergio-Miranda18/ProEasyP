import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Perfil.css';
import { FaUserAlt, FaPhoneAlt, FaIdCard, FaEnvelope } from 'react-icons/fa'; // Importar iconos
import Favicon from 'react-favicon';
const Perfil = () => {
  const [userData, setUserData] = useState({
    name: '',
    phoneNumber: '',
    identification: '',
    email: '',
  });

  useEffect(() => {
    // Obtener los datos del perfil del usuario (puedes obtenerlos desde el backend)
    axios.get('/api/user/profile')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del perfil:', error);
      });
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-card">
        <h2>Perfil de Usuario</h2>
        <div className="profile-details">
          <div className="profile-item">
            <FaUserAlt className="profile-icon" />
            <p><strong>Nombre:</strong> {userData.name}</p>
          </div>
          <div className="profile-item">
            <FaEnvelope className="profile-icon" />
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
          <div>
        <Favicon url="/images/eas.png" />
       
      </div>
          <div className="profile-item">
            <FaPhoneAlt className="profile-icon" />
            <p><strong>Teléfono:</strong> {userData.phoneNumber}</p>
          </div>
          <div className="profile-item">
            <FaIdCard className="profile-icon" />
            <p><strong>Identificación:</strong> {userData.identification}</p>
          </div>
          <button className="back-btn" onClick={() => window.history.back()}>Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
