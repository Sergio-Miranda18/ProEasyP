import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';

export const Login = ({ setShowLogin, setShowRegister, setShowRecuperacion }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const register = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowRegister(true);
    }, 500);
  };
  const recuperacion = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowRecuperacion(true);
    }, 500);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', { user: email, password });
      if (response.status === 200) {
        const { token, authorities } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ user: email, roles: authorities[0] }));
        localStorage.setItem('email', email);
        if (authorities.includes('ADMIN')) {
          window.location.href = '/GestionarReserva';
        } else if (authorities.includes('USER')) {
          window.location.href = '/Index';
        } else {
          window.location.href = '/';
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Usuario y/o Contraseña Incorrectos');
    }

    if (rememberMe) {
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
    }
  };

  return (
    <div className='login'>
      <div className='datoslogin'>
        
        <div className="contenedor-form-login">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="contenedor-input-login">
              <span className="icono">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="contenedor-input-login">
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo según el estado de showPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Contraseña</label>
              <span className="icono-ojo" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            <div className="recordar-login">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Recordar Sesión
              </label>
              <a href="#" onClick={recuperacion}>¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btnIniciar-login">Iniciar Sesión</button>

            <div className="registrar-login">
              <p>
                ¿No tienes cuenta?{' '}
                <a href="#" className="registrar-link" onClick={register}>
                  Regístrate
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
