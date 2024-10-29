import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lugares.css';

export const Lugares = () => {
    const [lugares, setLugares] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await axios.get('/api/local/get');
                console.log(response)
                setLugares(response.data);
            } catch (error) {
                console.error('Error al obtener los lugares de la base de datos', error);
            }
        };
        fetchLugares();
    }, []);

    return (
        <div className="lugares-container">
            <button className="btn-back" onClick={() => navigate(-1)}>Atrás</button>
            <h2 className="text-center mb-4">Lugares Disponibles</h2>
            <div className="row">
                {lugares.map((lugar) => (
                    <div key={lugar.idLocal} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`data:image/jpeg;base64,${lugar.img}`}
                                className="card-img-top"
                                alt={lugar.nombre}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{lugar.nombre}</h5>
                                <p className="card-text">{lugar.descripcion}</p>
                                <button className="btn btn-primary">Ver Más</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
