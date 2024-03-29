import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import _ from 'lodash'
import { FadeLoader } from "react-spinners"
import { useSnackbar } from 'notistack'
import axios from '../../../../../config/axios'
import UserCountCard from './UserCountCard'

const PieChart = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [users, setUsers] = useState([])
  const [chartData, setChartData] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/dashboard', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        setUsers(data)
      } catch (err) {
        enqueueSnackbar( err.message, {
          variant: 'error',
          autoHideDuration: 3000, 
        })
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const labels = users.map((item) => item._id);
    const data = users.map((item) => item.count);

    setChartData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    })
  }, [users])

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || ''
            return `${label}: ${value}`
          },
        },
      },
    },
  }

  const userCount = users.find((user) => user._id === 'user')?.count || 0
  // const adminCount = users.find((user) => user._id === 'admin')?.count || 0
  const technicianCount = users.find((user) => user._id === 'technician')?.count || 0
  const selfCount = users.find((user) => user._id === 'selfEmployee')?.count || 0

  return (
    <>
      <div className='text-center m-4'>
        <h4 style={{ fontSize: '18px', fontStyle: 'italic', fontWeight: 'bold' }}>Users Info</h4>
      </div>
      {
        users.length > 0 ? (
        <div className="d-flex justify-content-between">
          <div style={{ width: '500px', height: '350px' }}>
            {!_.isEmpty(chartData) && <Pie data={chartData} options={options} />}
          </div>
          <UserCountCard userCount={userCount} technicianCount={technicianCount} selfCount={selfCount} />
        </div>
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <FadeLoader
              color={"#7aa9ab"}
              loading={loading}
              size={30}
            />
          </div>
        )
      }
    </>
  )
}

export default PieChart
