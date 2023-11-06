import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Historial() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savingData")) || [];
    setData(data);
  }, []);

  
  function EliminarCotizacion(id) {
    const datosGuardados = [...data];
    datosGuardados.splice(id, 1);
    setData(datosGuardados);

    localStorage.setItem("savingData", JSON.stringify(datosGuardados));
  }

  return (
    <div>
      {" "}
      <h1 className="center separador">Ver Historial 📋</h1>
      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, id) => (
              <tr key={id}>
                <td>{data.fecha}</td>
                <td>{data.tipoPropiedad}</td>
                <td>{data.tipoUbicacion}</td>
                <td>{data.metros2}</td>
                <td>{data.poliza.toFixed(2)}</td>
                <td>
                  <button onClick={() => EliminarCotizacion(id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <Link to ="/">
            <button className="button button-outline">VOLVER</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
