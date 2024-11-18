import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import axios from 'axios';
import './ReservasCanceladas.css';
import Favicon from 'react-favicon';
export const ReservasCanceladas = () => {
    const [cancelledReservations, setCancelledReservations] = useState([]);

    // Obtener las reservas canceladas
    const fetchCancelledReservations = async () => {
        try {
            const response = await axios.get(`api/reserva/get`);
            console.log(response)
        const local = ('Activado');
            console.log(local)
            if (local) {
                const filteredData = response.data.filter(item => item.status === local); // Filtrar los datos por el local
                setData(filteredData);
                console.log("filteredData  ", filteredData)
            } else {
                setData([]);
            }
            setCancelledReservations(response.data);
        } catch (error) {
            console.error("Error al obtener las reservas canceladas:", error);
        }
    };

    useEffect(() => {
        fetchCancelledReservations();
    }, []);

    return (
        <div className="reservas-canceladas-container">
            <MenuAdmin />
            <div className="header">
                <p>Reservas Canceladas</p>
            </div>
            <div>
        <Favicon url="/images/eas.png" />
       
      </div>
            <div className="gestion-contenido">
                <table className="tabla-canceladas">
                    <thead>
                        <tr>
                            <th>ID Reserva</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Lugar</th>
                            <th>Mensaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cancelledReservations.length > 0 ? (
                            cancelledReservations.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.cliente}</td>
                                    <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                                    <td>{reserva.lugar}</td>
                                    <td>{reserva.mensaje}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="sin-reservas">
                                    No hay reservas canceladas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
