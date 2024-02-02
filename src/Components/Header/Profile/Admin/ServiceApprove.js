import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSnackbar } from 'notistack'
import axios from "../../../../config/axios"
import './ServiceApprove.css'

const ServiceApprove = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [ approveServices, setApproveServices ] = useState([])

    useEffect(()=>{
        axios.get("/api/service-provider", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res)=>{
                setApproveServices(res.data)
            })
            .catch((err)=>{
                enqueueSnackbar( err.message, {
                    variant: 'error',
                    autoHideDuration: 3000, 
                })
            })
    }, [])

    const handleAdminResponse = async (res, id)=>{
        try {
            const { data } = await axios.put(`/api/service-provider/${id}/${res}`, {}, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            const removeId = approveServices.filter( ele => ele._id !== data.id)
            setApproveServices(removeId)
        }catch(err){
            enqueueSnackbar( err.response.data.error || err.message, {
                variant: 'error',
                autoHideDuration: 5000, 
            })

        }
    }

  return (
    <div className="m-4">
        <h3 className="text-center">Approve List</h3>
        {approveServices.length > 0 ? (
            <div>
                {
                    approveServices.map((ele) => (
                        <div key={ele._id} className="services_card_custom">
                            <div className="service-provider-info">
                                <div className="services_image_container">
                                    <img
                                        src={ele.authorisedDealer.url}
                                        alt="authorised dealer"
                                    />
                                </div>
            
                                <div>
                                    <div className="mb-4">
                                        <h4 className="services_status_font">Name : 
                                            <span className="m-4">{ele.serviceProviderName} </span>
                                        </h4>
                                    </div>
                                        <p>
                                            <strong className="m-4">About - </strong> {ele.description}
                                        </p>
                                        <p>
                                            <strong className="m-4">Category - </strong> {ele.categoryId.title},
                                        </p>
                                        <p>
                                            <strong className="m-4">Services - </strong> {
                                                ele.serviceIds.map(ele => ele.serviceName).join(", ")
                                            }
                                        </p>
                                        <p>
                                            <strong className="m-4">service Type - </strong> {
                                            ele.serviceType.map(ele => ele).join(", ")
                                            }
                                        </p>
                                        <div className="m-5">
                                             <Button 
                                                className="btn btn-success mx-4"
                                                onClick={() => handleAdminResponse("approve", ele._id)}
                                             >Approve</Button>
                                             <Button 
                                                className="btn btn-danger mx-4"
                                                onClick={() => handleAdminResponse("reject", ele._id)}
                                            >Rejected</Button>
                                        </div> 
                                </div>
                                
                            </div>  
                        </div>
                    ))
                }
            </div>
        ) : (
            <span className="m-5 text-center bold">
                <h4>Empty........</h4>
            </span>
        )}
    </div>
  )
}

export default ServiceApprove