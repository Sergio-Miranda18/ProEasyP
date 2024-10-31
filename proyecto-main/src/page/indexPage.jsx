import React, { useState } from 'react';
import './indexPage.css'
import { Login } from './login/login';
import { Registro } from './register/registro';
import { Recuperacion } from './recuperacion/recuperacion';

export const IndexPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const toggleForm = () => {
        setShowRegister(false)
        setShowRecuperacion(false)
        setTimeout(() => {
            setShowLogin(!showLogin);
        }, 500);
    };
    const [showRegister, setShowRegister] = useState(false);
    const [showRecuperacion, setShowRecuperacion] = useState(false);

    return (
        <div className='Index-Page'>
           <div className='Header-Login'>
    <h2 className="Logo">EasyPlanning</h2>
    <div className="Slogan-Wrapper">"Tu evento, nuestra especialidad"</div>
    <ul className="navegacion">
        <a href="/">Inicio</a>
        <a href="/informacion">Información</a>
        <a href="/Contactenos">Contáctenos</a>
       </ul>
      </div>

            <div className="index-login">
                <div className={`loginindex ${showLogin ? 'show' : ''}`}>
                    {showLogin && (
                        <Login
                            setShowLogin={setShowLogin}
                            setShowRegister={setShowRegister}
                            setShowRecuperacion={setShowRecuperacion}
                        />
                    )}
                </div>
                <div className={`registerindex ${showRegister ? 'show' : ''}`}>
                    {showRegister && (
                        <Registro
                            setShowLogin={setShowLogin}
                            setShowRegister={setShowRegister}
                        />
                    )}
                </div>
                <div className={`recuperacionindex ${showRecuperacion ? 'show' : ''}`}>
                    {showRecuperacion && (
                        <Recuperacion
                            setShowLogin={setShowLogin}
                            setShowRecuperacion={setShowRecuperacion}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
