import React, { useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import './GestionarR.css';

export const GestionarServicios = () => {
    const [data, setData] = useState([
        { codigo: '001', lugar: 'Cancha 1', ubicacion: 'Centro', descripcion: 'Cancha de fútbol', precio: 50000, servicios: 'Fútbol' },
        { codigo: '002', lugar: 'Salón 2', ubicacion: 'Sur', descripcion: 'Salón de conferencias', precio: 25000, servicios: 'Conferencias' }
    ]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, newService]);
        setShowModal(false); // Cerrar el modal después de agregar el nuevo servicio
        setNewService({ codigo: '', lugar: '', ubicacion: '', descripcion: '', precio: '', servicios: '' }); // Limpiar formulario
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
                            <tr key={item.codigo}>
                                <td>{item.codigo}</td>
                                <td>{item.lugar}</td>
                                <td>{item.ubicacion}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.precio.toLocaleString('es-ES')}</td>
                                <td>{item.servicios}</td>
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
                                    <label>Código</label>
                                    <input 
                                        type="text" 
                                        name="codigo" 
                                        value={newService.codigo} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
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
                                    <input 
                                        type="text" 
                                        name="servicios" 
                                        value={newService.servicios} 
                                        onChange={handleChange} 
                                        required 
                                    />
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
