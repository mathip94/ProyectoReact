import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  guardarDepartamentos,
  guardarCiudades,
} from "../features/departamentosSlice";
import { useNavigate } from "react-router-dom";

const FormularioRegistro = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const departamentos = useSelector(
    (state) => state.departamentos.departamentos
  );
  const ciudades = useSelector((state) => state.departamentos.ciudades);
  const [departamentoSeleccionado, setDepartamentoSelecconado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetch("https://babytracker.develotion.com/departamentos.php")
      .then((r) => r.json())
      .then((datos) => {
        dispatch(guardarDepartamentos(datos.departamentos));
      });
  }, []);

  const cargarCiudades = (e) => {
    const idDepartamento = e.target.value;
    setDepartamentoSelecconado(idDepartamento);

    fetch(
      "https://babytracker.develotion.com/ciudades.php?idDepartamento=" +
        idDepartamento
    )
      .then((r) => r.json())
      .then((datos) => {
        dispatch(guardarCiudades(datos.ciudades));
      });
  };

  const registrarUsuario = () => {
    setCargando(true);

    let objUsuario = {
      usuario: usuario,
      password: password,
      idDepartamento: departamentoSeleccionado,
      idCiudad: ciudadSeleccionada,
    };

    if (departamentoSeleccionado === "" || ciudadSeleccionada === "") {
      setError(true);
      setCargando(false);
      return;
    }

    fetch("https://babytracker.develotion.com/usuarios.php", {
      method: "POST",
      body: JSON.stringify(objUsuario),
      headers: {
        "Content-type": "application/json;",
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        setCargando(false);
        if (datos.codigo === 200) {
          localStorage.setItem("token", datos.apiKey);
          localStorage.setItem("idUsuario", datos.id);
          navigate("/dashboard");
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setCargando(false);
        setError(true);
      });
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departamento">Departamento</label>
        <select
          id="departamento"
          name="departamento"
          required
          onChange={cargarCiudades}
        >
          <option value="">Seleccione un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>
              {departamento.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ciudad">Ciudad</label>
        <select
          id="ciudad"
          name="ciudad"
          required
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={registrarUsuario}
        disabled={cargando}
      >
        {cargando ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          "Registrar"
        )}
      </button>
      {error ? (
        <p className="alert alert-danger mt-3">
          Ha habido un problema con su registro
        </p>
      ) : null}
    </div>
  );
};

export default FormularioRegistro;
