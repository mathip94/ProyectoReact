import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const obtenerFechaSinTZ = (date = new Date()) => {
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const año = date.getFullYear();
  return  `${año}-${mes}-${dia}`
}



const InformeBiberones = () => {
  const eventos = useSelector((state) => state.eventos.eventos);
  const [totalBiberones, setTotalBiberones] = useState(0);
  const [tiempoUltimoBiberon, setTiempoUltimoBiberon] = useState("");

  const fechaLocal = obtenerFechaSinTZ();
  
  const biberonesHoy = eventos.filter((evento) => evento.idCategoria === 35 && obtenerFechaSinTZ(new Date(evento.fecha)) === fechaLocal);
   
  const actualizarTiempo = () => {
    const ultimoBiberon = biberonesHoy[biberonesHoy.length - 1];
    const tiempoTranscurrido = calcularTiempoTranscurrido(ultimoBiberon.fecha);
    setTiempoUltimoBiberon(tiempoTranscurrido);
  }

  useEffect(() => {

    setTotalBiberones(biberonesHoy.length);

    if (biberonesHoy.length > 0) {
      actualizarTiempo();
      const intervalo = setInterval(actualizarTiempo, 60000);

      return () => clearInterval(intervalo);
    } else {
      setTiempoUltimoBiberon("No hay biberones registrados hoy.");
    }
  }, [eventos]);

  const calcularTiempoTranscurrido = (fecha) => {
    const ahora = new Date();
    const fechaEvento = new Date(fecha);
    const diferenciaMinutos = Math.floor((ahora - fechaEvento) / (1000 * 60));

    return `${diferenciaMinutos} minutos`;
  };

  return (
    <div>
      <h4>Total de Biberones Ingeridos Hoy : {totalBiberones}</h4>
      <h4>
        Tiempo Transcurrido Desde el Último Biberón : {tiempoUltimoBiberon}
      </h4>
    </div>
  );
};

export default InformeBiberones;
