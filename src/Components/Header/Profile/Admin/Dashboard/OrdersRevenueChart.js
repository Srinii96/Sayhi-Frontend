import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { FadeLoader } from "react-spinners"
import axios from '../../../../../config/axios'
import './OrdersRevenueChart.css'

const DashboardCards = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/booking/dashboard', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        setData(response.data || []);
      } catch (err) {
        enqueueSnackbar( err.response.data.error || err.message, {
          variant: 'error',
          autoHideDuration: 3000, 
        })
      }
    }

    fetchData()
  }, [])

  const { categories, totalBookingsAll, totalRevenueAll, adminProfit } = data[0] || {}

  return (
    <>
      {
        data.length > 0 ? (
        <div className="dashboard-cards-container">
        
          {/* Admin Profit Card */}
          <div className="dashboard-card admin-profit-card">
              <h3>Admin Profit</h3>
              <p>{parseInt(adminProfit)}</p>
          </div>

          {/* Cards for Each Category */}
          {categories &&
            categories.map((category, index) => (
              <div key={index} className="dashboard-card">
                  <h3>{category.category}</h3>
                  <p>Total Bookings: {category.totalBookings}</p>
                  <p>Total Revenue: {category.totalRevenue}</p>
              </div>
            ))
          }

          {/* Summary Card for All Categories */}
          <div className="dashboard-card total-card">
              <h3>Total</h3>
              <p>Total Bookings: {totalBookingsAll}</p>
              <p>Total Revenue: {totalRevenueAll}</p>
          </div>
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

export default DashboardCards
