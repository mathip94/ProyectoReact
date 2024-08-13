import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FormularioLogin = () => {
  const usuario = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [habilitarBoton, setHabilitarBoton] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    if (token && idUsuario) {
      navigate("/dashboard");
    }
  }, []);

  const logearUsuario = () => {
    setCargando(true);

    let objLogin = {
      usuario: usuario.current.value,
      password: password.current.value,
    };

    fetch("https://babytracker.develotion.com/login.php", {
      method: "POST",
      body: JSON.stringify(objLogin),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        setCargando(false);
        if (datos.codigo === 200) {
          localStorage.setItem("token", datos.apiKey);
          localStorage.setItem("idUsuario", datos.id);
          navigate("dashboard");
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setCargando(false);
        setError(true);
      });
  };

  const actualizarEstadoBoton = () => {
    setHabilitarBoton(usuario.current.value.trim() !== '' && password.current.value.trim() !== '');
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="username">Usuario</label>
        <input
          className="form-control"
          type="text"
          id="username"
          name="username"
          required
          ref={usuario}
          onChange={actualizarEstadoBoton}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          required
          ref={password}
          onChange={actualizarEstadoBoton}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary me-2"
          type="button"
          onClick={logearUsuario}
          disabled={cargando || !habilitarBoton}
        >
          {cargando ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Ingresar"
          )}
        </button>
        <NavLink to="registro" className="navlink-button">
          {" "}
          Registrate{" "}
        </NavLink>
      </div>
      {error ? (
        <p className="alert alert-danger mt-3">Error en usuario y/o password</p>
      ) : null}
    </div>
  );
};

export default FormularioLogin;
