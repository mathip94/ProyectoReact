import FormularioRegistro from "./FormularioRegistro";

const ContenedorRegistro = () => {
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
          <h2 className="text-center">Registro</h2>
          <FormularioRegistro />
        </div>
      </div>
    </>
  );
};

export default ContenedorRegistro;
