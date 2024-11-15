import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './recuperacion.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../environment';

export const Recuperacion = ({ setShowLogin, setShowRecuperacion }) => {
    const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
    const [showPasswordFields, setShowPasswordFields] = useState(false);

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
            const response = await axios.post(`${API_BASE_URL}/forgot-password/reset`, { newPassword: formData.newPassword, email: formData.email  });
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
                <span className="icono-cerrar" onClick={() => setShowRecuperacion(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
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
                            />
                            <label>Email</label>
                        </div>

                        {showPasswordFields && (
                            <>
                                <div className="contenedor-input">
                                    <span className="icono">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>Nueva Contraseña</label>
                                </div>

                                <div className="contenedor-input">
                                    <span className="icono">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>Confirmar Contraseña</label>
                                </div>
                            </>
                        )}

                        <button type="submit" className="btnrecuperacion">
                            {showPasswordFields ? 'Cambiar Contraseña' : 'Enviar'}
                        </button>

                        <div className="inicio">
                            <p>
                                ¿Tienes una cuenta?{' '}
                                <a href="#" className="Login-link" onClick={() => setShowLogin(true)}>
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
