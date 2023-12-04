import { useState, useReducer, useEffect } from "react";
import { porcBolsa, porcKilo, porcPersonalizado, porcPersonalizadoKilo } from "../logica/calculos.js";
import { format } from "date-fns";

export function useCalculadora() {
  const [formValues, setFormValues] = useState({
    aumento: '',
    nombre: '',
    porcent: '',
    precioProveedor: '',
    kilos: '',
  });

  const [resForm, setResForm] = useState({
    resAumento: '',
    resNombre: '',
    resBolsa: '',
    resKilos: '',
  });

  const [calculoRealizado, setCalculoRealizado] = useState(false);
  const [fechasCalculos, setFechasCalculos] = useState([]);
  const [errorNombre, setErrorNombre] = useState(false);

  const obtenerDatos = () => {
    const data = localStorage.getItem('calculos');
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [calculos, dispatch] = useReducer((state,action) => {
    switch (action.type) {
      case 'add_list': {
        return [
          ...state,
          {
            id: state.length,
            aumento: action.aumento,
            name: action.name,
            priceBag: action.precioBolsa,
            priceKg: action.precioKilo,
            kilos: action.kilos,
            fecha: action.fecha
          },
        ];
      }
      case 'delete_list': {
        return state.filter((_, index) => index !== action.index);
      }

      default: {
        return state;
      }
    }
  }, 
  obtenerDatos(), // Función para el estado inicial
  );

  useEffect(() => {
    // Obtener datos después del primer renderizado
    dispatch({ type: 'init', data: obtenerDatos() });
  }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setCalculoRealizado(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.precioProveedor === '' || calculoRealizado) return;

    formValues.aumento
      ? setResForm({
        ...resForm,
        resNombre: formValues.nombre,
        resAumento: formValues.aumento,
        resBolsa: porcPersonalizado(formValues.precioProveedor, formValues.aumento),
        resKilos: porcPersonalizadoKilo(formValues.precioProveedor, formValues.kilos, formValues.aumento),
      })
      : setResForm({
        ...resForm,
        resNombre: formValues.nombre,
        resBolsa: porcBolsa(formValues.precioProveedor),
        resKilos: porcKilo(formValues.precioProveedor, formValues.kilos),
      });

    setCalculoRealizado(true);
  };

  const addList = () => {
    if (resForm.resNombre === '' || formValues.nombre === '') {
      setErrorNombre(true);
      return;
    }

    const fechaActual = new Date();
    const formatoFecha = format(fechaActual, 'dd/MM/yyyy - HH:mm');

    setFechasCalculos([...fechasCalculos, formatoFecha]);

    setResForm({
      resAumento: '',
      resNombre: '',
      resBolsa: '',
      resKilos: '',
    });

    setFormValues({
      aumento: '',
      nombre: '',
      precioProveedor: '',
      kilos: '',
    });

    dispatch({
      type: 'add_list',
      aumento: formValues.aumento,
      name: resForm.resNombre,
      precioBolsa: resForm.resBolsa,
      precioKilo: resForm.resKilos,
      kilos: formValues.kilos,
      fecha: formatoFecha
    });

    setCalculoRealizado(false);
    setErrorNombre(false);
  };

  const handleDelete = (index) => {
    dispatch({ type: 'delete_list', index });
  };

  useEffect(()=> {
    localStorage.setItem('calculos', JSON.stringify(calculos));
  },[calculos])

  return {
    formValues,
    resForm,
    calculoRealizado,
    fechasCalculos,
    errorNombre,
    calculos,
    handleChange,
    handleSubmit,
    addList,
    handleDelete,
  };
}
