export const porcBolsa = (a) => {
  const porcentaje = a * .20;
  const res = porcentaje + parseFloat(a);
  return res;
}

export const porcKilo = (a,b) => {
  if(b) {
    const porcentaje = a * .40;
    const bolsa = porcentaje + parseFloat(a);
    const res = bolsa / b;
  
    return res.toFixed(2);
  }
  return b = 0
}


export const porcPersonalizado = (a,c) => {
  if (isNaN(c)) {
    // Maneja el caso en el que c no es un número válido
    console.error("El valor de aumento no es un número válido");
    return; // o maneja el error de alguna otra manera
  }

  const d = '0.' + c;
  const porcentaje = a * .20;
  const bolsa = porcentaje + parseFloat(a);
  const aumento = bolsa * parseFloat(d);
  const resAumento = aumento + bolsa;
  
  return resAumento.toFixed(2)
}

export const porcPersonalizadoKilo = (a,b,c) => {
  if (isNaN(c)) {
    // Maneja el caso en el que c no es un número válido
    console.error("El valor de aumento no es un número válido");
    return; // o maneja el error de alguna otra manera
  }

  const d = '0.' + c;
  const porcentaje = a * .40;
  const bolsa = porcentaje + parseFloat(a);
  const aumento = bolsa * parseFloat(d);
  const resSuma = aumento + bolsa;
  const resAumento = resSuma / b
  
  return resAumento.toFixed(2)
}