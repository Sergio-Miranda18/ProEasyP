import { useEffect, useState } from 'react';
import './script.css';

export const Script = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));
  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('users', '');
    window.location.href = "/"
  };
  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    setUser(localStorage.getItem('users'));
  }, []);

  return (
    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">
          {user && <p>Bienvenido, {user}!</p>}
        </div>
        <div className="abajo">
          <button onClick={handleLogout }>
            <i className="fa fa-sign-out"></i>Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export const ScriptUser = () => {
  const [user, setUser] = useState(localStorage.getItem('username'));
  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
    window.location.href = "/"
  };
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
          <button onClick={handleLogout}>
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
