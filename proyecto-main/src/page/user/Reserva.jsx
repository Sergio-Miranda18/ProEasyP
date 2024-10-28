import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Reserva.css';
import axios from 'axios';

export const Reserva = () => {
    const [formData, setFormData] = useState({
        email: localStorage.getItem('email') || '',
        precio: '',
        fechaHora: '',
        local: '',
        categoria: '',
        estado: 'EN PROCESO',
        paquete: '',
    });

    const [localTypes, setLocalTypes] = useState([]);
    const [categoriaTypes, setCategoriaTypes] = useState([]);
    const [paqueteTypes, setPaquetesTypes] = useState([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [localResponse, paqueteResponse, categoriaResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/local/get'),
                    axios.get('http://localhost:8080/api/paquete/get'),
                    axios.get('http://localhost:8080/api/categoria/get'),
                ]);
                setLocalTypes(localResponse.data);
                setPaquetesTypes(paqueteResponse.data);
                setCategoriaTypes(categoriaResponse.data);
            } catch (error) {
                console.error('Error al obtener datos de la base de datos', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLocalChange = async (e) => {
        const selectedLocal = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            local: selectedLocal,
        }));
console.log(selectedLocal)
        // Realizar solicitud para obtener el precio del lugar seleccionado
        if (selectedLocal) {
            try {
                const response = await axios.get(`http://localhost:8080/api/local/${selectedLocal}`);
                console.log(response)
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    precio: response.data || "", // Asignar el precio obtenido o vacío si no existe
                }));
            } catch (error) {
                console.error('Error al obtener el precio del lugar seleccionado', error);
            }

        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                precio: "", // Reiniciar el precio si no hay selección
            }));
        }
    };

    const handleReset = () => {
        setFormData({
            email: localStorage.getItem('email') || '',
            precio: '',
            fechaHora: '',
            local: '',
            categoria: '',
            estado: 'EN PROCESO',
            paquete: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedLocal = localTypes.find(type => type.idLocal === parseInt(formData.local));
            const selectedCategoria = categoriaTypes.find(type => type.id === parseInt(formData.categoria));
            const selectedPaquete = paqueteTypes.find(type => type.id === parseInt(formData.paquete));
            setShowToast(true);
            await axios.post('http://localhost:8080/api/reserva/save', {
                local: { idLocal: selectedLocal ? selectedLocal.idLocal : null },
                email: { email: formData.email },
                estado: formData.estado,
                fecha: formData.fechaHora, // Enviar fecha y hora como un solo valor
                precio: formData.precio,
                categoria: { id: selectedCategoria ? selectedCategoria.id : null },
                paquete: { id: selectedPaquete ? selectedPaquete.id : null },
            });
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
                        <select className="form-select" id="local" name="local" value={formData.local} onChange={handleLocalChange} required>
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
                        <label htmlFor="fechaHora">Fecha y Hora del evento</label>
                        <input type="datetime-local" className="form-control" id="fechaHora" name="fechaHora" value={formData.fechaHora} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input type="text" className="form-control" id="precio" name="precio" value={formData.precio} readOnly disabled required />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn btn-primary">Reservar</button>
                    </div>
                    <div className="back-button">
                        <a href="/Index">Atrás</a>
                    </div>
                </form>
            </div>

            <ToastContainer position="top-end" className="p-3">
                <Toast 
                    className="custom-toast" 
                    onClose={() => setShowToast(false)} 
                    show={showToast} 
                    delay={6000} 
                    autohide
                >
                    <Toast.Header className="custom-toast-header">
                        <strong className="me-auto">Reserva</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>¡Reserva registrada correctamente!</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};
