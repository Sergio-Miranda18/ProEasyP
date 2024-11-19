import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerR.css';
import { API_BASE_URL } from '../../environment';
import Favicon from 'react-favicon';
export const VerReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/reserva/get`);
                const email = localStorage.getItem('email');
                if (email) {
                    const filtered = response.data.filter(item => item.email.email && item.email.username === email);
                    setReservas(filtered);
                } else {
                    setReservas([]);
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
        navigate(-1);
    };

    const handleCancelClick = (reserva) => {
        setSelectedReserva(reserva);
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setSelectedReserva(null);
        setCancelReason('');
    };

    const handleCancelConfirm = async () => {
        if (cancelReason.trim() === '') {
            alert('Por favor, ingresa un motivo para la cancelación.');
            
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/reserva/cancel/${selectedReserva.id}`, {
            cancelReason
            });
            alert('Reserva cancelada exitosamente.');
            setReservas((prev) => prev.filter((reserva) => reserva.id !== selectedReserva.id));
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            alert('Hubo un problema al cancelar la reserva.');
        } finally {
            handleDialogClose();
        }
    };

    return (
        <div className="ver-reservas-container">
            <div className="header">
                <h1>Mis Reservas</h1>
            </div>
            <div>
        <Favicon url="/images/eas.png" />
       
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
                                <button className="btn-cancelar" onClick={() => handleCancelClick(reserva)}>
                                    Cancelar Reserva
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-reservas">No tienes reservas disponibles.</p>
                    )
                )}
            </div>
            <div className="btn-atras-container">
                <button className="btn-atras1" onClick={handleBackClick}>
                    Atrás
                </button>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h2>Cancelar Reserva</h2>
                        <p>¿Por qué deseas cancelar esta reserva?</p>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Escribe tu motivo aquí..."
                        ></textarea>
                        <div className="dialog-buttons">
                            <button className="btn-confirmar" onClick={handleCancelConfirm}>Confirmar</button>
                            <button className="btn-cerrar" onClick={handleDialogClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
