import { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import axios from "../../../config/axios"

const PaymentFailure = () => {
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true)
    const [isFailure, setIsFailure] = useState(false)

    useEffect(()=>{
        (async ()=>{
            try{
                const stripId = localStorage.getItem("stripId")
                const { data } = await axios.delete(`/api/payment/${stripId}`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })

                setIsFailure(!isFailure)
                localStorage.removeItem("stripId")

                setTimeout(()=>{
                    navigate("/profile/my-orders")
                }, 9000)
            }catch(err){
                console.log(err)
            }
        })()
    }, [])

  return (
    <div>
        {isFailure ? (
            <>
                <div className="d-flex justify-content-center mt-4">
                <h3>Transaction failed</h3>
                <img 
                    src={process.env.PUBLIC_URL + "/Images/status/payment-failed.png"}
                    alt="success"
                    style={{width: "25%",}}
                />
                </div>

                <div className="d-flex justify-content-center m-4">
                    <b>Please don't click anything, stay on the page.......we will redirect to payment page again</b>
                </div>
            </>
        ) : (
            <div style={{ height: "59vh" }} className="d-flex justify-content-center align-items-center">
                <FadeLoader
                    color={"#7aa9ab"}
                    loading={loading}
                    size={30}
                />
            </div>
        )}
    </div>
  )
}

export default PaymentFailure