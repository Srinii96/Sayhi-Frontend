import { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import reducerContext from '../../../../../contextApi\'s/contextAPI';

const CategoryChart = () => {
  const { state } = useContext(reducerContext);
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the existing Chart instance before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new Chart instance
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: state.categories.map(category => category.title),
        datasets: [
          {
            label: 'Number of Services',
            data: state.categories.map(category => category.serviceIds.length),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    })

    chartRef.current = newChart
  }, [state.categories])

  return (
    <div>
      <canvas id="categoryChart" width="400" height="200"></canvas>
    </div>
  )
}

export default CategoryChart
