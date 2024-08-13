import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import ListaEventos from './ListaEventos';
import { guardarEventos } from "../features/eventosSlice";

const ContenedorListas = () => {
    
    const idUsuario = localStorage.getItem('idUsuario');
    const eventos = useSelector(state => state.eventos.eventos);
    const dispatch = useDispatch();
    const [eventosDelDia, setEventosDelDia] = useState([]);
    const [eventosAnteriores, setEventosAnteriores] = useState([]);

    useEffect(() => {
        fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${idUsuario}`, {
        method: 'GET',
        headers: {
        "Content-type": "application/json",
        apikey: localStorage.getItem("token"),
        iduser: localStorage.getItem("idUsuario")
      },
    })
    .then((r) => r.json())
    .then((datos) =>{
        dispatch(guardarEventos(datos.eventos));    
    });
    }, []);
    
    useEffect(() => {
      const hoy = new Date();
      const dia = hoy.getDate().toString().padStart(2, '0');
      const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); 
      const año = hoy.getFullYear();

      const fechaLocal = `${año}-${mes}-${dia}`;

      const eventosHoy = eventos.filter(evento => evento.fecha.startsWith(fechaLocal));
      const eventosPasados = eventos.filter(evento => !evento.fecha.startsWith(fechaLocal));

      setEventosDelDia(eventosHoy);
      setEventosAnteriores(eventosPasados);

    }, [eventos]);

  return (
    <div>
        <ListaEventos eventos={eventosDelDia} titulo="Eventos de Hoy" />
        <ListaEventos eventos={eventosAnteriores} titulo="Eventos Anteriores" />
    </div>
  )
}

export default ContenedorListas