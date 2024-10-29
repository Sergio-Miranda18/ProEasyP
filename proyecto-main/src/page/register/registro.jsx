import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registro.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faXmark, faIdCard, faPhone } from '@fortawesome/free-solid-svg-icons';

export const Registro = ({ setShowLogin, setShowRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        apellido: '',
        documento: '',
        clave: '',
        clave1: '',
        telefono: '',
    });

    const login = () => {
        setShowRegister(false);
        setTimeout(() => {
            setShowLogin(true);
        }, 500); // Ajusta el tiempo de retraso según lo que necesites
    };

    useEffect(() => {
        document.title = "Registro";
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
            nombre: '',
            apellido: '',
            documento: '',
            clave: '',
            clave1: '',
            telefono: '',
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario a enviar:', formData);
            if (formData.clave === formData.clave1) {
                const requestData = await axios.post('http://localhost:8080/api/auth/register', {
                    email: formData.email,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    documento: formData.documento,
                    clave: formData.clave,
                    telefono: formData.telefono,
                });

                console.log('Respuesta al guardar usuario:', requestData.data);
                alert('Usuario registrado correctamente');
                handleReset();
            } else {
                alert('Las contraseñas no coinciden');
            }
        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }
    };

    return (
        <div className='registro'>
            <div className='datosregistro'>
                
                <div className="contenedor-form-register">
                    <h2>Registrarse</h2>
                    <form onSubmit={onLogin}>
                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            <label>Nombre</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                            <label>Apellido</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faIdCard} />
                            </span>
                            <input type="text" name="documento" value={formData.documento} onChange={handleChange} required />
                            <label>Documento de Identidad</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            <label>Email</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
                            <label>Teléfono</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input type="password" name="clave" value={formData.clave} onChange={handleChange} required />
                            <label>Contraseña</label>
                        </div>

                        <div className="contenedor-input-resgistro">
                            <span className="icono">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input type="password" name="clave1" value={formData.clave1} onChange={handleChange} required />
                            <label>Confirmar Contraseña</label>
                        </div>

                        <div className="recordar">
                            <label>
                                <input type="checkbox" required /> Acepto los términos y condiciones
                            </label>
                        </div>

                        <button type="submit" className="btnregistrar">Registrarme</button>

                        <div className="registrar">
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
