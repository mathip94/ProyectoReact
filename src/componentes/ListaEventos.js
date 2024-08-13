import { useDispatch,useSelector } from 'react-redux';
import { borrarEventoSlice } from '../features/eventosSlice';
import { useState,useEffect } from 'react';

const ListaEventos = ({ eventos, titulo }) => {
  
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.categorias);
  const [eventosConImagenes, setEventosConImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerIdImagen = (idCategoria) => {
    const categoria = categorias.find(cat => cat.id === idCategoria);
    return categoria ? categoria.imagen : null;
  };

  useEffect(() => {
    if (eventos.length > 0 && categorias.length > 0) {
      const eventosActualizados = eventos.map(evento => ({
        ...evento,
        idImagen: obtenerIdImagen(evento.idCategoria),
      }));
      setEventosConImagenes(eventosActualizados);
      setCargando(false);
    }else{
      setCargando(false);
    }
  }, [eventos, categorias]);

  const borrarEvento = (idEvento) =>{
    fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${idEvento}`,{
      method: 'DELETE',
      headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("token"),
        iduser: localStorage.getItem("idUsuario")
      },
    })
    .then((response) => response.json())
    .then(() => {
      dispatch(borrarEventoSlice(idEvento));
    });
  
  };

  return (
    <div className="lista-eventos">
      <h2>{titulo}</h2>
      {cargando ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {eventos.length > 0 ? (
            <ul>
              {eventosConImagenes.map((evento) => (
                <li key={evento.id}>
                  <p>{evento.detalle}</p> 
                  <p>{new Date(evento.fecha).toLocaleString()}</p>
                  <img src={`https://babytracker.develotion.com/imgs/${evento.idImagen}.png`} alt="Imagen bebeapp" />
                  <button type="button" className="btn btn-danger ml-3" style={{ marginLeft: '5px' }} onClick={() => borrarEvento(evento.id)}>Eliminar Evento</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="alert alert-danger">No hay eventos para mostrar</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListaEventos