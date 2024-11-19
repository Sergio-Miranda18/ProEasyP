import { useEffect, useState } from 'react';
import './script.css';

export const Script = () => {
  const [user, setUser] = useState(localStorage.getItem('email'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('email'));
  }, []);

  return (
    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}
        </div>
        <div className="abajo">
          <button onClick={() => window.location.href = "/"}>
            <i className="fa fa-sign-out"></i>Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export const ScriptUser = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('username'));
  }, []);

  return (
    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}
        </div>
        <div className="abajo">
          <button onClick={() => window.location.href = "/EditarPerfilUser"}>
            <i className="fa fa-plus"></i>Editar usuario
          </button>
          <button onClick={() => window.location.href = "/"}>
            <i className="fa fa-sign-out"></i>Salir
          </button>
        </div>
      </div>
    </div>
  );
};
