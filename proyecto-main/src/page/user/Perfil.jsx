import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Perfil.css';
import { FaUserAlt, FaPhoneAlt, FaIdCard, FaEnvelope } from 'react-icons/fa'; // Importar iconos
import Favicon from 'react-favicon';
const Perfil = () => {
  const [userData, setUserData] = useState({
    
  });

  const fetchUserAndOptions = async () => {
    try {
        const tokens = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${tokens}` };

        // Fetch user data
        const userResponse = await axios.get('/api/auth/editar', { headers });
        setUserData(userResponse.data);
        console.log(userResponse)

    } catch (error) {
        console.error('Error fetching user data or options', error);
    }
};
useEffect(() => {


    fetchUserAndOptions();
}, []);

  return (
    <div className="user-profile">
      <div className="profile-card">
        <h2>Perfil de Usuario</h2>
        <div className="profile-details">
          <div className="profile-item">
            <FaUserAlt className="profile-icon" />
            <p><strong>Nombre:</strong> {userData.nombre}</p>
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
            <p><strong>Teléfono:</strong> {userData.telefono}</p>
          </div>
          <div className="profile-item">
            <FaIdCard className="profile-icon" />
            <p><strong>Identificación:</strong> {userData.documento}</p>
          </div>
          <button className="back-btn" onClick={() => window.history.back()}>Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
