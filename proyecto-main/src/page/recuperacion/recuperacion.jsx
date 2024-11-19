import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './recuperacion.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../environment';
import Favicon from 'react-favicon';

export const Recuperacion = ({ setShowLogin, setShowRecuperacion }) => {
    const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/forgot-password/email`, { email: formData.email });
            console.log('Recuperación solicitada:', response.data);
            setShowPasswordFields(true);
        } catch (error) {
            console.error('Error al procesar solicitud de recuperación:', error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword === formData.confirmPassword) {
            const response = await axios.post(`${API_BASE_URL}/forgot-password/reset`, { newPassword: formData.newPassword, email: formData.email });
            alert('Contraseña actualizada correctamente');
            setShowRecuperacion(false);
            setShowLogin(true);
        } else {
            alert('Las contraseñas no coinciden');
        }
    };

    return (
        <div className='recuperacion'>
            <div className='datosrecuperacion'>
                <div className="contenedor-form-recuperacion">
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <form onSubmit={showPasswordFields ? handlePasswordSubmit : handleEmailSubmit}>
                        <div className="contenedor-input">
                            <span className="icono">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={showPasswordFields}
                                placeholder="Ingresa tu correo"
                            />
                        </div>
                        <div>
        <Favicon url="/images/eas.png" />
       
      </div>
                        {showPasswordFields && (
                            <>
                                <div className="contenedor-input">
                                    <span className="icono" onClick={() => setShowNewPassword(!showNewPassword)}>
                                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                    </span>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nueva Contraseña"
                                    />
                                </div>

                                <div className="contenedor-input">
                                    <span className="icono" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirmar Contraseña"
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="btnrecuperacion">
                            {showPasswordFields ? 'Cambiar Contraseña' : 'Enviar'}
                        </button>

                        <div className="inicio">
                            <p>
                                ¿Tienes una cuenta?{' '}
                                <a
                                    href="#"
                                    className="Login-link"
                                    onClick={() => {
                                        setShowLogin(true);
                                        setShowRecuperacion(false); // Oculta la vista de recuperación
                                    }}
                                >
                                    Iniciar Sesión
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
