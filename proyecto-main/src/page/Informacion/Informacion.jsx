import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para navegar entre rutas
import './Informacion.css';

export const Informacion = () => {
    const navigate = useNavigate();  // Usamos useNavigate para navegar

    // Función para manejar el clic del botón "Atrás"
    const handleBackClick = () => {
        navigate(-1);  // Navega a la página anterior
    };

    return (
        <div className="informacion-container-1">
            <h1>Bienvenidos a EasyPlanning</h1>
            <section className="section">
                <h2>¿Qué es EasyPlanning?</h2>
                <p>
                    EasyPlanning es una plataforma de reservas diseñada para facilitar la planificación de eventos. Con ella, podrás reservar lugares, seleccionar servicios, y elegir entre una variedad de paquetes personalizados para que tu evento sea único.
                </p>
            </section>

            <section className="section">
                <h2>¿Por qué elegir EasyPlanning?</h2>
                <ul>
                    <li>Acceso a una amplia variedad de lugares y servicios.</li>
                    <li>Facilidad para comparar precios y servicios en un solo lugar.</li>
                    <li>Reservas rápidas y seguras con confirmación inmediata.</li>
                    <li>Soporte para ayudarte en cada paso del proceso de planificación.</li>
                </ul>
            </section>

            <section className="section">
                <h2>¿Cómo funciona?</h2>
                <ol>
                    <li>Regístrate o inicia sesión en tu cuenta.</li>
                    <li>Explora los lugares y paquetes disponibles.</li>
                    <li>Selecciona tu lugar y personaliza tu reserva según tus necesidades.</li>
                    <li>Recibe la confirmación de tu reserva y prepárate para un evento exitoso.</li>
                </ol>
            </section>

            <section className="section-1">
                <h2>¿Tienes preguntas?</h2>
                <p>
                    Nuestro equipo de soporte está aquí para ayudarte. Visita la sección de <a href="#" onClick={() => alert('Formulario de contacto en construcción')}>Contáctenos</a> para más información.
                </p>
            </section>
            
            {/* Botón Atrás al final */}
            <button className="btn-atras" onClick={handleBackClick}>Atrás</button>
        </div>
    );
};
