import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './recuperacion.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faXmark, faIdCard, faPhone } from '@fortawesome/free-solid-svg-icons';

export const Recuperacion = ({ setShowLogin, setShowRecuperacion }) => {
    const [formData, setFormData] = useState({
        email: '',
        
    });

    const login = () => {
        setShowRecuperacion(false);
        setTimeout(() => {
            setShowLogin(true);
        }, 500); // Ajusta el tiempo de retraso según lo que necesites
    };

    useEffect(() => {
        document.title = "Recuperacion";
        const verUsuario = async () => {
            const response = await axios.get('http://localhost:8080/api/usuario/get');
            console.log(response.data);
        };

        verUsuario();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            email: '',
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario a enviar:', formData);
            
                const requestData = await axios.post('http://localhost:8080/api/auth/register', {
                    email: formData.email,
                    
                });

                console.log('Respuesta al recuperar: ', requestData.data);
                alert('recuperacion correctamente');
                handleReset();
            
        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
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
                    <form onSubmit={onLogin}>
                        <div className="contenedor-input">
                            <span className="icono">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            <label>Email</label>
                        </div>

                        <button type="submit" className="btnrecuperacion">Enviar</button>

                        <div className="inicio">
                            <p>
                                ¿Tienes una cuenta?{' '}
                                <a href="#" className="Login-link" onClick={login}>
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
