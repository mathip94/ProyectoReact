import FormularioLogin from './FormularioLogin'

const Contenedor = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          BebeApp
        </a>
        <div className="ml-auto"></div>
      </nav>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="login-container p-4 shadow bg-white rounded">
          <h2 className="text-center">Iniciar Sesión</h2>
          <FormularioLogin />
        </div>
      </div>
    </>
  );
};

export default Contenedor;