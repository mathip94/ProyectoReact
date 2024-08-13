import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarCategorias } from '../features/categoriasSlice';
import { agregarEventoSlice } from '../features/eventosSlice';

const FormularioAgregarEvento = () => {
  
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.categorias);
  const idCategoria = useRef(null);
  const detalle = useRef(null);
  const fecha = useRef(null);
  const [error, setError] = useState(false);

  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const horas = String(hoy.getHours()).padStart(2, '0');
  const minutos = String(hoy.getMinutes()).padStart(2, '0');

  const fechaActual = `${anio}-${mes}-${dia}T${horas}:${minutos}`;

  useEffect(() => {

    fetch("https://babytracker.develotion.com/categorias.php", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("token"),
        iduser: localStorage.getItem("idUsuario")
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        dispatch(guardarCategorias(datos.categorias));
    });

    //Seccion Fecha 

    fecha.current.max = fechaActual;
    fecha.current.value = fechaActual;
    
  }, []);

  const agregarEvento = () =>{


    let objEvento ={
      "idCategoria": +idCategoria.current.value,
      "idUsuario": +localStorage.getItem("idUsuario"),
      "detalle": detalle.current.value,
      "fecha": fecha.current.value, 
    }

    if(idCategoria.current.value === ""){
      setError(true);
      return;
    }else {
      setError(false);
    }

    fetch('https://babytracker.develotion.com/eventos.php', {
      method: 'POST',
      body: JSON.stringify(objEvento),
      headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("token"),
        iduser: localStorage.getItem("idUsuario")
      },
    })
    .then((r) => r.json())
    .then((datos) => {
      if (datos.codigo === 200) {
        const idEvento = +datos.idEvento;
        let objEventoStore = {
          "id": idEvento,
          "idCategoria": +idCategoria.current.value,
          "idUsuario": +localStorage.getItem("idUsuario"),
          "detalle": detalle.current.value,
          "fecha": fecha.current.value,
        };
        dispatch(agregarEventoSlice(objEventoStore));
        idCategoria.current.value = "";
        detalle.current.value = "";
        fecha.current.value = fechaActual;
      }else{
        setError(true);
      }
    });
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select id="category" name="category" ref={idCategoria} defaultValue="" required>
          <option value="" disabled>
            Seleccione una categoría
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.tipo}
            </option>
          ))}
        </select>
        {error ? <p className="alert alert-danger">Debe seleccionar una categoria</p> : null}
      </div>
      <div className="form-group">
        <label htmlFor="datetime">Fecha y Hora</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          ref={fecha}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="details">Detalles</label>
        <textarea
          id="details"
          name="details"
          rows="4"
          placeholder="Ingrese detalles adicionales (opcional)"
          ref={detalle}
        ></textarea>
      </div>
      <button type="button" className='btn btn-primary' onClick={agregarEvento}>Agregar Evento</button>
    </div>
  );
};

export default FormularioAgregarEvento;