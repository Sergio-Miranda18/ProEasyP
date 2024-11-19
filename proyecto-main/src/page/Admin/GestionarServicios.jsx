import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import './GestionarR.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Favicon from 'react-favicon';

export const GestionarServicios = () => {
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newService, setNewService] = useState({
        codigo: '',
        lugar: '',
        ubicacion: '',
        descripcion: '',
        precio: '',
        servicios: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const fechLugares = async () => {
        const response = await axios.get('/api/local/get');
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
        
    };

    const fechCategoria = async () => {
        const response = await axios.get('/api/categoria/get');
        setCategoria(response.data);
    };

    useEffect(() => {
        fechLugares();
        fechCategoria();
    }, []);

    const toggleModal = () => setShowModal(!showModal);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setErrorMessage('');
        } else {
            setSelectedFile(null);
            setErrorMessage('Solo se permiten archivos de imagen.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleReset = () => {
        setNewService({
            codigo: '',
            lugar: '',
            ubicacion: '',
            descripcion: '',
            precio: '',
            servicios: ''
        });
        setSelectedFile(null);
        setErrorMessage('');
        setIsEditMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", selectedFile);
        formData.append("nombre", newService.lugar);
        formData.append("ubicacion", newService.ubicacion);
        formData.append("descripcion", newService.descripcion);
        formData.append("precio", newService.precio);
        formData.append("categoriaId", newService.servicios);

        try {
            if (isEditMode) {
                await axios.put(`/api/local/update/${newService.codigo}`, formData);
            } else {
                await axios.post('/api/local/save', formData);
            }
            setShowModal(false);
            fechLugares();
            handleReset();
        } catch (error) {
            console.error("Error al guardar el lugar:", error);
        }
    };

    const handleDelete = async (codigo) => {
        try {
            await axios.put(`/api/local/delete/${codigo}`);
            fechLugares();
        } catch (error) {
            console.error("Error al eliminar el lugar:", error);
        }
    };

    const handleEdit = (codigo) => {
        const lugar = data.find(item => item.idLocal === codigo);
        if (lugar) {
            setNewService({
                codigo: lugar.idLocal,
                lugar: lugar.nombre,
                ubicacion: lugar.ubicacion,
                descripcion: lugar.descripcion,
                precio: lugar.precio,
                servicios: lugar.categoria.id
            });
            setIsEditMode(true);
            setShowModal(true);
        }
    };

    return (
        <div className='reserva'>
            <MenuAdmin />
            <div className="header2">
                <p>Administrar Lugares</p>
            </div>
            <div>
        <Favicon url="/images/eas.png" />
       
      </div>
            <div className="gestion-contenido">
                <button className="btn-agregar" onClick={() => { handleReset(); toggleModal(); }}>Agregar nuevo lugar</button>
                <table className="tabla-servicios">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Lugar</th>
                            <th>Ubicación</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Servicios</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.idLocal}>
                                <td>{item.idLocal}</td>
                                <td>{item.nombre}</td>
                                <td>{item.ubicacion}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.precio.toLocaleString('es-ES')}</td>
                                <td>{item.categoria.descripcion}</td>
                                <td>
                                    <button className="btn-editar" onClick={() => handleEdit(item.idLocal)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn-eliminar" onClick={() => handleDelete(item.idLocal)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="paginacion">
                    <span>Anterior</span>
                    <span className="pagina-activa">1</span>
                    <span>Siguiente</span>
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{isEditMode ? 'Editar lugar' : 'Agregar nuevo lugar'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Lugar</label>
                                    <input
                                        type="text"
                                        name="lugar"
                                        value={newService.lugar}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Ubicación</label>
                                    <input
                                        type="text"
                                        name="ubicacion"
                                        value={newService.ubicacion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Descripción</label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        value={newService.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Precio</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={newService.precio}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Servicios</label>
                                    <select
                                        name="servicios"
                                        value={newService.servicios}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione un servicio</option>
                                        {categoria.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='input-group'>
                                    <input type="file" onChange={handleFileChange} />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="btnprimary-1">Guardar</button>
                                    <button type="button" className="btnprimary-2" onClick={() => { toggleModal(); handleReset(); }}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
