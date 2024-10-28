import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import './GestionarR.css';
import axios from 'axios';

export const GestionarServicios = () => {
    const [data, setData] = useState([]);
    const [categoria, setCategoria] = useState([]);

    const fechLugares = async () => {
        const response = await axios.get('/api/local/get')
        console.log(response)
        setData(response.data)

    }
    const fechCategoria = async () => {
        const response = await axios.get('/api/categoria/get')
        console.log(response)
        setCategoria(response.data)

    }
    useEffect(() => {
        fechLugares()
        fechCategoria()
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [newService, setNewService] = useState({
        codigo: '',
        lugar: '',
        ubicacion: '',
        descripcion: '',
        precio: '',
        servicios: ''
    });

    const toggleModal = () => setShowModal(!showModal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/local/save',
            {
                nombre: newService.lugar,
                ubicacion: newService.ubicacion,
                descripcion: newService.descripcion,
                precio: newService.precio,
                categoria: { id: newService.servicios },
            }

        )
        setShowModal(false); // Cerrar el modal después de agregar el nuevo servicio
        fechLugares()
    };

    const handleEdit = (codigo) => {
        alert(`Editando el registro con código: ${codigo}`);
    };

    return (
        <div className='reserva'>
            <MenuAdmin />
            <div className="header2">
                <p>Administrar Lugares</p>
            </div>
            <div className="gestion-contenido">
                <div className="mensaje-exito">

                </div>
                <button className="btn-agregar" onClick={toggleModal}>Agregar nuevo lugar</button>
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
                                    <button className="btn-editar" onClick={() => handleEdit(item.codigo)}>✏️</button>
                                    <button className="btn-eliminar">🗑️</button>
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

                {/* Modal para agregar nuevo servicio */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Agregar nuevo lugar</h2>
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
                                        id="servicios"
                                        name="servicios"
                                        value={newService.servicios}
                                        onChange={handleChange} required
                                    >
                                        <option key="" value="">Seleccione Tipo de Identificación</option>
                                        {categoria.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="btnprimary-1">Guardar</button>
                                    <button type="button" className="btnprimary-2" onClick={toggleModal}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
