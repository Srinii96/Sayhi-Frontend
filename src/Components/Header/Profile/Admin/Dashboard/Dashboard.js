import { useContext } from 'react'
import reducerContext from '../../../../../contextApi\'s/contextAPI'
import CategoryServicesTable from "./CategoryServicesTable "
import CategoryChart from './CategoryChart'

const Dashboard = () => {
  const { state } = useContext(reducerContext)

  return (
    <div className="bg-light"> 
        <h3 className="text-center">Dashboard</h3>
        <CategoryServicesTable categories={state.categories} />

        <CategoryChart categories={state.categories} />

    </div>
  )
}

export default Dashboard