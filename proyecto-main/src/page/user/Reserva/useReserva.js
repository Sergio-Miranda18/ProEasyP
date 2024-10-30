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

  const obtenerFirma = (updatedFormData) => {
    return firmarDatos(
      PAYU.MERCHANT_ID,
      PAYU.API_KEY,
      updatedFormData.codigoReferencia,
      updatedFormData.precio
    );
  };

  const obtenerReserva = (updatedFormData) => {
    const reservaString = [
      formData.email,
      "EN PROCESO",
      updatedFormData?.local ?? "",
      updatedFormData?.fechaHora ?? "",
      updatedFormData?.precio ?? 0,
      updatedFormData?.categoria ?? "",
      updatedFormData?.paquete ?? "",
    ].join(",");

    return reservaString;
  };

  const obtenerDescripcion = (updatedFormData) => {
    const selectedLocal = localTypes.find(
      (local) => local.idLocal == updatedFormData.local
    );
    const selectedCategory = categoriaTypes.find(
      (categoria) => categoria.id == updatedFormData.categoria
    );
    const selectedPaquete = paqueteTypes.find(
      (paquete) => paquete.id == updatedFormData.paquete
    );
    const fecha = formatearFechaColombia(Date(updatedFormData?.fechaHora));
    const descripcion = `Reserva en el ${selectedLocal?.nombre} con el paquete ${selectedPaquete?.nombre}. Categoría: ${selectedCategory?.descripcion}. Evento programado para: ${fecha}.`;

    return descripcion;
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

  const handleChange = (e) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setReserva(obtenerReserva(updatedFormData));
    setFormData({
      ...updatedFormData,
      firma: obtenerFirma(updatedFormData),
      descripcion: obtenerDescripcion(updatedFormData),
    });
  };

  useEffect(() => console.log("fromdata", formData), [formData])

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
