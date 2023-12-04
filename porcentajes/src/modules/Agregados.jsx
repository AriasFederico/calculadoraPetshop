export function Agregados ({
  precioBolsa,
  precioKilo,
  name, 
  index, 
  dispatch, 
  kilos, 
  fecha,
  aumento
  }) {

  return(
    <div className="contenedor-agregador">
      {
        aumento 
          ? <div className="agregado-item">
              <h3 className="aumento-agregados">Aumento de % {aumento}</h3>
              <h3 className="agregado-item-title">{name && name.toUpperCase()} - {kilos} kg</h3>
              <p>BOLSA: $ <span className="span-precios-agregados">{precioBolsa}</span></p>
              <p>KILOS: $ <span className="span-precios-agregados">{precioKilo}</span></p>
              <p className="fecha">Fecha: {fecha}</p>
              <button onClick={()=> dispatch(index)} className="btn-delete">Eliminar</button>
            </div>
          : <div className="agregado-item">
              <h3 className="agregado-item-title">{name && name.toUpperCase()} - {kilos} kg</h3>
              <p>BOLSA: $ <span className="span-precios-agregados">{precioBolsa}</span></p>
              <p>KILOS: $ <span className="span-precios-agregados">{precioKilo}</span></p>
              <p className="fecha">Fecha: {fecha}</p>
              <button onClick={()=> dispatch(index)} className="btn-delete">Eliminar</button>
            </div>
      }
    </div>
  )
}
