import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficaComidas = () => {
  
  const eventos = useSelector((state) => state.eventos.eventos);

  const obtenerUltimos7Dias = () => {
    const fechas = [];
    for (let i = 6; i >= 0; i--) {
      const hoy = new Date();
      const dia = hoy.getDate().toString().padStart(2, '0') - i;
      const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); 
      const año = hoy.getFullYear();
      const fechaLocal = `${año}-${mes}-${dia}`;

      
      fechas.push(fechaLocal);
    }
    return fechas;
  };

  const ultimos7Dias = obtenerUltimos7Dias();

  const conteoComidasPorDia = ultimos7Dias.map((fecha) => {
    return eventos.filter((evento) => {
      return evento.idCategoria === 31 && evento.fecha.startsWith(fecha); // Suponiendo que la categoría 'Comida' tiene id 31
    }).length;
  });

  return (
    <div>
      <h2>Comidas Ingeridas en la Última Semana</h2>
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Comidas por Día (Última Semana)",
            },
          },
        }}
        data={{
          labels: ultimos7Dias,
          datasets: [
            {
              label: "Cantidad de Comidas",
              data: conteoComidasPorDia,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default GraficaComidas;
