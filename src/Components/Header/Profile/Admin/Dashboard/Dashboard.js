import { useContext } from 'react'
import reducerContext from '../../../../../contextApi\'s/contextAPI'
import CategoryServicesTable from "./CategoryServicesTable "
import CategoryChart from './CategoryChart'
import UsersCategory from './UsersCategory'
import OrdersRevenueChart from './OrdersRevenueChart'

const Dashboard = () => {
  const { state } = useContext(reducerContext)

  return (
    <div className="bg-light"> 
        <h3 className="text-center">Dashboard</h3>

        <OrdersRevenueChart />
        <UsersCategory />
        <CategoryServicesTable categories={state.categories} />
        <CategoryChart categories={state.categories} />

    </div>
  )
}

export default Dashboard