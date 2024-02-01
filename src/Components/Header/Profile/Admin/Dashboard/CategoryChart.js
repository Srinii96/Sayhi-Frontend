import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const CategoryChart = ({ categories }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    const datasets = categories.map((category, index) => ({
      label: category.title,
      data: [category.serviceIds.length],
      backgroundColor: getColor(index),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }))

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Number of Services'],
        datasets: datasets,
      },
    })

    chartRef.current = newChart
  }, [categories])

  const getColor = (index) => {
    const colors = [
      "#FF4500", "#00FF7F", "#8A2BE2", "#32CD32", "#FFD700",
      "#4682B4", "#9400D3", "#DC143C", "#20B2AA", "#00CED1",
      "#FF6347", "#00FA9A", "#1E90FF", "#FF69B4", "#3CB371",
      "#800000", "#FFA07A", "#008080", "#FFDAB9", "#2E8B57",
      "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000",
      "#5F9EA0", "#B22222", "#008B8B", "#8B4513", "#191970",
      "#FF1493", "#32CD32", "#800080", "#7B68EE", "#FA8072",
      "#40E0D0", "#8B4513", "#7CFC00", "#9932CC", "#FF4500",
      "#00FF00", "#6A5ACD", "#A0522D", "#48D1CC", "#B0C4DE",
      "#FFD700", "#FF6347"
    ]
    
    return colors[index % colors.length]
  }

  return (
    <div className='mx-4'>
      <canvas id="categoryChart" width="400" height="200"></canvas>
    </div>
  )
}

export default CategoryChart
