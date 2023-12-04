import React, { useState } from 'react';

const MostrarFecha = () => {
  const [fecha, setFecha] = useState('');

  const mostrarFechaActual = () => {
    const fechaActual = new Date();
    const formatoFecha = fechaActual.toLocaleString();
    setFecha(formatoFecha);
  };

  return (
      <p>{fecha}</p>
  );
};

export default MostrarFecha;