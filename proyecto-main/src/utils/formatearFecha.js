export const formatearFechaColombia = (fechaHora) => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const fecha = new Date(fechaHora);

  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const ampm = horas >= 12 ? "p. m." : "a. m.";

  // Convertimos horas al formato 12 horas
  horas = horas % 12 || 12;

  return `${dia} de ${mes} de ${año}, ${horas}:${minutos} ${ampm}`;
};
