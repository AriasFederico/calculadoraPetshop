import { Agregados } from "./Agregados.jsx";
import { useCalculadora } from "../hooks/useCalculadora.js";

export function Calculadora() {

  const {
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
  } = useCalculadora();

  const {
    aumento,
    nombre,
    precioProveedor,
    kilos,
  } = formValues;

  const {
    resBolsa,
    resKilos,
  } = resForm;

  return (
    <div className="calculadora-container">
      <div className="title-fecha">
        <h4>Por defecto - % 20 / % 40</h4>
      </div>
      <div className="form-btns">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre de la bolsa: 
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              className="input input-name"
            />
          </label>
          <label htmlFor="aumento">Con aumento de:
            <input type="number"
            name="aumento"
            value={aumento}
            onChange={handleChange}
            className="input" />
          </label>
          <div className="input-porc-flex">
            <label htmlFor="precioProveedor">Precio del proveedor: $
              <input
                type="text"
                name="precioProveedor"
                value={precioProveedor}
                onChange={handleChange}
                className="input"
              />
            </label>
          </div>
          <div className="input-porc-flex">
            <label htmlFor="kilos">Kilos:
              <input
                type="text"
                name="kilos"
                value={kilos}
                onChange={handleChange}
                className="input"
              />
              Kg
            </label>
          </div>
          <button type='submit' className="btn">Calcular</button>
        </form>

        <div className="res-container">
          {
            aumento 
            ? <p>Con aumento de: %<span className="aumento"> {aumento}</span></p>
            : <p>Con aumento de: %<span className="aumento"> 0</span></p>
          }
          {
            aumento
              ? <div>
                  <p>Precio de la bolsa $ <span className="span-precio">{resBolsa}</span>  (+ % {aumento} % 20)</p>
                  <p>Precio del kilo $ <span className="span-precio">{resKilos}</span>  (+ % {aumento} % 40)</p>
                </div>
              : <div>
                  <p>Precio de la bolsa $ <span className="span-precio">{resBolsa}</span>  (% 20)</p>
                  <p>Precio del kilo $ <span className="span-precio">{resKilos}</span>  (% 40)</p>
                </div>
          }

        </div>

        <button onClick={addList} className="btn">Agregar</button>
        {errorNombre && <p className="errorNombre">Indicar el nombre antes de agregarlo</p>}

      </div>

      <div className="agregados-container">
        <h3 className="calculados-title">Precios calculados</h3>
        <div className="agregados-item">
        {
        calculos && calculos.map((item,index)=> <Agregados key={index}
        precioBolsa={item.priceBag}
        precioKilo={item.priceKg} 
        name={item.name} 
        index={index} 
        dispatch={handleDelete} 
        kilos={item.kilos}
        fecha={item.fecha.toString()}
        aumento={item.aumento}/>)
        }
        </div>
      </div>
    </div>
  )
}