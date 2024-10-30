import axios from "axios";
import { API_BASE_URL } from "../../environment";
import { useEffect, useState } from "react";

export const useConfirmacion = () => {
  const [datosReserva, setDatosReserva] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(queryParams.entries());
    setDatosReserva(paramsObj);

    const crearReserva = async () => {
      try {
        const [email, estado, local, fecha, precio, categoria, paquete] =
          paramsObj.extra1.split(",");
        console.log("AQUUIUIUIUI")
        await axios.post(`${API_BASE_URL}/reserva/save`, {
          id: paramsObj.referenceCode,
          local: { idLocal: local ? local : null },
          email: { email },
          estado,
          fecha,
          precio: parseFloat(precio),
          categoria: { id: categoria ? categoria : null },
          paquete: { id: paquete ? paquete : null },
        });
      } catch (error) {
        console.error(
          "Error al guardar la información en la base de datos",
          error
        );
      }
    };

    crearReserva();
  }, []);

  return {
    datosReserva,
  };
};
