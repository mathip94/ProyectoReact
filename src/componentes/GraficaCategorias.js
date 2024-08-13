import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const GraficaCategorias = () => {
  const eventos = useSelector((state) => state.eventos.eventos);
  const categorias = useSelector((state) => state.categorias.categorias);

  const categoriasMap = categorias.reduce((acumulador, categoria) => {
    acumulador[categoria.id] = categoria.tipo;
    return acumulador;
  }, {});

  const conteoCategorias = eventos.reduce((acumulador, evento) => {
    const categoria = evento.idCategoria;
    if (!acumulador[categoria]) {
      acumulador[categoria] = 0;
    }
    acumulador[categoria]++;
    return acumulador;
  }, {});
  

  const labels = Object.keys(conteoCategorias).map((id) => categoriasMap[id]);
  const data = Object.keys(conteoCategorias).map((id) => conteoCategorias[id]);

  return (
    <div>
      <p>Distribución de eventos por categoría</p>

      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Eventos por Categoría",
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Cantidad de Eventos",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
}

export default GraficaCategorias