import ContenedorListas from "./ContenedorListas";
import ContenedorInformeDeEventos from "./ContenedorInformeDeEventos";
import ContenedorAgregarEvento from "./ContenedorAgregarEvento";
import ContenedorGraficaCategorias from "./ContenedorGraficaCategorias";
import ContenedorGraficaComidas from "./ContenedorGraficaComidas";
import ContenedorTiempoRestante from "./ContenedorTiempoRestante";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const ContenedorDashboard = () => {
  
  let navigate = useNavigate();
  const [logeado, setLogeado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    if (!token && !idUsuario) {
      navigate("/");
    }else{
      setLogeado(true);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if(!logeado) {
    return null;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          BebeApp
        </a>
        <div className="ml-auto">
          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorAgregarEvento />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorListas />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorGraficaCategorias />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorGraficaComidas />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorTiempoRestante />
            </div>
          </div>
          <div className="col-md-6">
            <div className="section bg-white p-3 shadow-sm rounded">
              <ContenedorInformeDeEventos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContenedorDashboard;
