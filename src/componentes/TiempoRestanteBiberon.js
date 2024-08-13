import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TiempoRestanteBiberon = () => {
  
  const eventos = useSelector((state) => state.eventos.eventos);
  const [tiempoRestante, setTiempoRestante] = useState("");
  const [colorTexto, setColorTexto] = useState("green");

  useEffect(() => {
    const biberones = eventos.filter((evento) => evento.idCategoria === 35);

    if (biberones.length > 0) {
      const ultimoBiberon = biberones[biberones.length - 1];
      const actualizarTiempoRestante = () => {
        const tiempoRestante = calcularTiempoRestante(ultimoBiberon.fecha);
        setTiempoRestante(tiempoRestante);
      };

      actualizarTiempoRestante();
      const intervalo = setInterval(actualizarTiempoRestante, 60000);

      return () => clearInterval(intervalo);
    } else {
      setTiempoRestante("No hay biberones registrados.");
      setColorTexto("red");
    }
  }, [eventos]);

  const calcularTiempoRestante = (fecha) => {
    const ahora = new Date();
    const fechaEvento = new Date(fecha);
    const diferenciaMinutos = Math.floor((ahora - fechaEvento) / (1000 * 60));
    const minutosRestantes = 240 - diferenciaMinutos;

    if (minutosRestantes > 0) {
      setColorTexto("green");
      const horas = Math.floor(minutosRestantes / 60);
      const minutos = minutosRestantes % 60;
      return `${horas} horas y ${minutos} minutos`;
    } else {
      setColorTexto("red");
      return `Se excedió el tiempo por ${Math.abs(minutosRestantes)} minutos`;
    }
  };

  return (
    <div>
      <h4 style={{ color: colorTexto }}>
        Tiempo Restante para el Próximo Biberón: {tiempoRestante}
      </h4>
    </div>
  );
};

export default TiempoRestanteBiberon;
