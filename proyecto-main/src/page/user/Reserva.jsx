import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './Reserva.css';
import axios from 'axios';

export const Reserva = () => {
    const generarPrecioAleatorio = () => {
        return Math.floor(Math.random() * (5000000 - 300000 + 1)) + 300000;
    };

    const [formData, setFormData] = useState({
        email: localStorage.getItem('username') || '',
        precio: '',
        fecha: '',
        local: '',
        categoria: '',
        estado: 'EN PROCESO',
        paquete: '',
    });

    const [localTypes, setLocalTypes] = useState([]);
    const [categoriaTypes, setCategoriaTypes] = useState([]);
    const [paqueteTypes, setPaquetesTypes] = useState([]);

    useEffect(() => {
        const fetchLocalTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local/get');
                setLocalTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchPaqueteTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/paquete/get');
                setPaquetesTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchCategoriaTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categoria/get');
                setCategoriaTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona de la base de datos', error);
            }
        };

        fetchLocalTypes();
        fetchPaqueteTypes();
        fetchCategoriaTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            email: localStorage.getItem('username') || '',
            precio: '',
            fecha: '',
            local: '',
            categoria: '',
            estado: 'EN PROCESO',
            paquete: '',
        });
    };

    const handleCalculatePrice = () => {
        const precioAleatorio = generarPrecioAleatorio();
        setFormData({
            ...formData,
            precio: precioAleatorio,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const selectedLocalTypes = localTypes.find(type => type.idLocal === parseInt(formData.local));
            const selectedCategoriaTypes = categoriaTypes.find(type => type.id === parseInt(formData.categoria));
            const selectedPaquetesTypes = paqueteTypes.find(type => type.id === parseInt(formData.paquete));

            await axios.post('http://localhost:8080/api/reserva/save', {
                local: { idLocal: selectedLocalTypes ? selectedLocalTypes.idLocal : null },
                email: { email: formData.email },
                estado: formData.estado,
                fecha: formData.fecha,
                precio: formData.precio,
                categoria: { id: selectedCategoriaTypes ? selectedCategoriaTypes.id : null },
                paquete: { id: selectedPaquetesTypes ? selectedPaquetesTypes.id : null },
            });

            alert('Reserva registrada correctamente');
        } catch (error) {
            console.error('Error al guardar la información en la base de datos', error);
        }

        handleReset();
    };

    return (
        <div className="reserva-page">
            <div className="container-form">
                <h2>¡¡RESERVA TUS EVENTOS!!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="local">Lugar</label>
                        <select className="form-select" id="local" name="local" value={formData.local} onChange={handleChange} required>
                            <option key="" value="">Seleccione el tipo</option>
                            {localTypes.map(type => (
                                <option key={type.idLocal} value={type.idLocal}>{type.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="paquete">Paquete</label>
                        <select className="form-select" id="paquete" name="paquete" value={formData.paquete} onChange={handleChange} required>
                            <option key="" value="">Seleccione el tipo</option>
                            {paqueteTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoría</label>
                        <select className="form-select" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required>
                            <option key="" value="">Seleccione el tipo</option>
                            {categoriaTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha del evento</label>
                        <input type="date" className="form-control" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input type="text" className="form-control" id="precio" name="precio" value={formData.precio} readOnly disabled required />
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="btn btn-secondary" onClick={handleCalculatePrice}>Calcular Precio</button>
                        <button type="submit" className="btn btn-primary">Reservar</button>
                    </div>
                    <div className="back-button">
                        <a href="/Index">Atrás</a>
                    </div>
                </form>
            </div>
        </div>
    );
};
