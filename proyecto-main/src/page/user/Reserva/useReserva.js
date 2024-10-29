import { useEffect, useState } from "react";
import axios from "axios";
import { PAYU, API_BASE_URL } from "../../../environment";
import { firmarDatos, formatearFechaColombia } from "../../../utils";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_FROM_DATA = {
  email: localStorage.getItem("email") || "",
  precio: 0,
  fechaHora: "",
  local: "",
  categoria: "",
  estado: "EN PROCESO",
  paquete: "",
  descripcion: "",
  firma: "",
  codigoReferencia: "",
};

export const useReserva = () => {
  const [formData, setFormData] = useState(DEFAULT_FROM_DATA);
  const [localTypes, setLocalTypes] = useState([]);
  const [categoriaTypes, setCategoriaTypes] = useState([]);
  const [paqueteTypes, setPaquetesTypes] = useState([]);
  const [reserva, setReserva] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [localResponse, paqueteResponse, categoriaResponse] =
          await Promise.allSettled([
            axios.get(`${API_BASE_URL}/local/get`),
            axios.get(`${API_BASE_URL}/paquete/get`),
            axios.get(`${API_BASE_URL}/categoria/get`),
          ]);

        setLocalTypes(localResponse.value.data);
        setPaquetesTypes(paqueteResponse.value.data);
        setCategoriaTypes(categoriaResponse.value.data);
      } catch (error) {
        console.error("Error al obtener datos de la base de datos", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, codigoReferencia: uuidv4() }));
  }, []);

  useEffect(() => {
    const nuevaFirma = firmarDatos(
      PAYU.MERCHANT_ID,
      PAYU.API_KEY,
      formData.codigoReferencia,
      formData.precio
    );

    setFormData((prev) => ({ ...prev, firma: nuevaFirma }));
  }, [formData.precio, formData.codigoReferencia]);

  useEffect(() => {
    const selectedLocal = localTypes.find(
      (local) => local.idLocal == formData.local
    );
    const selectedCategory = categoriaTypes.find(
      (categoria) => categoria.id == formData.categoria
    );
    const selectedPaquete = paqueteTypes.find(
      (paquete) => paquete.id == formData.local
    );
    const fecha = formatearFechaColombia(Date(formData?.fechaHora));

    const descripcion = `Reserva en el ${selectedLocal?.nombre} con el paquete ${selectedPaquete?.nombre}. Categoría: ${selectedCategory?.descripcion}. Evento programado para: ${fecha}.`;

    setFormData((prev) => ({ ...prev, descripcion }));

    const reservaString = [
      formData.email,
      "EN PROCESO",
      formData?.local ?? "",
      formData?.fechaHora ?? "",
      formData?.precio ?? 0,
      formData?.categoria ?? "",
      formData?.paquete ?? "",
    ].join(",");

    setReserva(reservaString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPrecioPorLocalSeleccioando = async (selectedLocal) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/local/${selectedLocal}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el precio del lugar seleccionado", error);
      return 0;
    }
  };

  const handleLocalChange = async (e) => {
    const selectedLocal = e.target.value;
    const precio = await getPrecioPorLocalSeleccioando(selectedLocal);

    setFormData((prevFormData) => ({
      ...prevFormData,
      local: selectedLocal,
      precio: selectedLocal ? precio : 0,
    }));
  };

  const handleReset = () => {
    setFormData(DEFAULT_FROM_DATA);
  };

  return {
    handleChange,
    handleLocalChange,
    handleReset,
    formData,
    categoriaTypes,
    localTypes,
    paqueteTypes,
    reserva,
  };
};
