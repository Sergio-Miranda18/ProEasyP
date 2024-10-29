import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegación
import './VerR.css';

export const VerReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                
                const response = await axios.get(`http://localhost:8080/api/reserva/get`);
                
                console.log (response);
                const email=localStorage.getItem('email')
                if(email){
                    const filtered =response.data.filter(item => item.email.email && item.email.username === email); 
                     setReservas(filtered);
                }
                else{
                    setReservas([])
                }
            } catch (error) {
                console.error('Error al cargar reservas: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, []);

    const handleBackClick = () => {
        navigate(-1); // Navega hacia atrás en el historial
    };

    return (
        <div className="ver-reservas-container">
            <div className="header">
                <h1>Mis Reservas</h1>
            </div>
            <div className="reservas-list">
                {loading ? (
                    <p>Cargando reservas...</p>
                ) : (
                    reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <div key={reserva.id} className="reserva-card">
                                <h2>{reserva.local.nombre}</h2>
                                <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> {new Date(reserva.fecha).toLocaleTimeString()}</p>
                                <p><strong>Paquete:</strong> {reserva.paquete.nombre}</p>
                                <p><strong>Estado:</strong> {reserva.estado}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tienes reservas disponibles.</p>
                    )
                )}
            </div>
            <div className="btn-atras-container">
                <button className="btn-atras" onClick={handleBackClick}>
                    Atrás
                </button>
            </div>
        </div>
    );
};
