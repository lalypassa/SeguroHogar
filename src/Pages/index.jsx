import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index() {
  const [data, setData] = useState({
    tipoPropiedad: "",
    factorPropiedad: 0,
    tipoUbicacion: "",
    factorUbicacion: 0,
    metros2: 0,
    costoM2: 35.86,
    poliza: 0,
  });

  const [categorias, setCategorias] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const datos = await fetch("datos.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const cat = await datos.json();
      setCategorias(cat);
    };
    fetchData();
  }, [data]);

  const propiedades = useMemo(() => {
    return (categorias || []).filter(
      (itemCat) => itemCat.categoria === "propiedad"
    );
  }, [categorias]);

  const ubicacion = useMemo(() => {
    return (categorias || []).filter(
      (itemCat) => itemCat.categoria === "ubicacion"
    );
  }, [categorias]);

  const handlePropChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setData((oldData) => ({
      ...oldData,
      factorPropiedad: e.target.value,
      tipoPropiedad: selectedOption.textContent,
    }));
  };

  const handleUbiChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setData((oldData) => ({
      ...oldData,
      factorUbicacion: e.target.value,
      tipoUbicacion: selectedOption.textContent,
    }));
  };

  const handleM2Change = (e) => {
    setData((oldData) => ({ ...oldData, metros2: e.target.value }));
  };

  const cotizarPoliza = () => {
    const poliza =
      data.costoM2 * data.factorPropiedad * data.factorUbicacion * data.metros2;
    setData((oldData) => ({ ...oldData, poliza }));

    const savingData = localStorage.getItem("savingData");
    const parsedSavingData = JSON.parse(savingData || "[]");
    parsedSavingData.push({ ...data, poliza, fecha: new Date() });
    localStorage.setItem("savingData", JSON.stringify(parsedSavingData));
  };

  const validarCampos = () => {
    if (
      data.tipoPropiedad === "" ||
      data.tipoUbicacion === "" ||
      data.metros2 === 0
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe completar todos los campos",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      cotizarPoliza();
    }
  };

  return (
    <div>
      <div className="historial">
        <a href="/historial">
          <span title="Ver Historial">📋</span>
        </a>
      </div>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select defaultValue="" id="propiedad" onChange={handlePropChange}>
          <option value="">...</option>
          {propiedades.map((itemCat) => (
            <option key={itemCat.tipo} value={itemCat.factor}>
              {itemCat.tipo}
            </option>
          ))}
        </select>
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select defaultValue="" id="ubicacion" onChange={handleUbiChange}>
          <option value="">...</option>
          {ubicacion.map((itemCat) => (
            <option key={itemCat.tipo} value={itemCat.factor}>
              {itemCat.tipo}
            </option>
          ))}
        </select>
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          min="20"
          max="500"
          required
          value={data.metros2}
          onChange={handleM2Change}
        />
        <div className="center separador">
          <button onClick={validarCampos} className="button button-outline">
            Cotizar
          </button>
        </div>
        <div className="center separador">
          <p className="importe">
            Precio estimado: $<span id="valorPoliza">{data.poliza.toFixed(2)}</span>
            <span className="guardar ocultar" title="Guardar en historial">
              💾
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
