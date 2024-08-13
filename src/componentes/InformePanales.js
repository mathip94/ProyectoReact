import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const obtenerFechaSinTZ = (date = new Date()) => {
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const año = date.getFullYear();
  return  `${año}-${mes}-${dia}`
}

const InformePanales = () => {
  const eventos = useSelector((state) => state.eventos.eventos);
  const [totalPanales, setTotalPanales] = useState(0);
  const [tiempoUltimoPanal, setTiempoUltimoPanal] = useState("");

  const fechaLocal = obtenerFechaSinTZ();

  const panalesHoy = eventos.filter(
    (evento) =>
      evento.idCategoria === 33 && obtenerFechaSinTZ(new Date(evento.fecha)) === fechaLocal
  );

  const ultimoPanal = panalesHoy[panalesHoy.length - 1];

  const actualizarTiempo = () => {
    const tiempoTranscurrido = calcularTiempoTranscurrido(ultimoPanal.fecha);
    setTiempoUltimoPanal(tiempoTranscurrido);
  };

  useEffect(() => {
    setTotalPanales(panalesHoy.length);

    if (panalesHoy.length > 0) {
      actualizarTiempo();
      const intervalo = setInterval(actualizarTiempo, 60000);

      return () => clearInterval(intervalo);
    } else {
      setTiempoUltimoPanal("No hay cambios de pañales registrados hoy.");
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
      <h4>Total de Pañales Cambiados Hoy : {totalPanales}</h4>
      <h4>
        Tiempo Transcurrido Desde el Último Cambio de Pañal :{" "}
        {tiempoUltimoPanal}{" "}
      </h4>
    </div>
  );
};

export default InformePanales;
