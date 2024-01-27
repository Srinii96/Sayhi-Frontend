import { useEffect } from "react"

const ServiceTypes = (props) => {
  const { serviceProviders } = props

  const serviceNamesFilter = (serviceProviders) => {
    const uniqueServiceNames = []
  
    serviceProviders.forEach((ele) => {
      ele.serviceIds.forEach((serviceId) => {
        const serviceNameObject = { id: serviceId._id, serviceName: serviceId.serviceName }
  
        const existingIndex = uniqueServiceNames.findIndex((obj) => obj.id === serviceNameObject.id)
  
        if (existingIndex === -1) {
          uniqueServiceNames.push(serviceNameObject)
        }
      })
    })

    return uniqueServiceNames
  }
  
  useEffect(() => {
    serviceNamesFilter(serviceProviders)
  }, [serviceProviders])
  
  return (
    <div>
      <h3>Service Types</h3>
      <ul>
        {serviceNamesFilter(serviceProviders).map((ele)=>{
          return(
            <li key={ele.id}>{ele.serviceName}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default ServiceTypes