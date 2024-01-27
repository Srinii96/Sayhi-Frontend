import { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import axios from "../../../config/axios"

const PaymentSuccess = () => {
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true)
    const [isSuccess, setIsSucess] = useState(false)

    useEffect(()=>{
        (async ()=>{
            try{
                const stripId =  localStorage.getItem("stripId")
                const { data } = await axios.put(`/api/payment/${stripId}`, {}, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                setIsSucess(!isSuccess)
                localStorage.removeItem("stripId")

                setTimeout(()=>{
                    navigate("/reviews", {state: data})
                }, 9000)
            }catch(err){
                console.log(err)
            }
        })()
    }, [])

  return (
    <div>
        {isSuccess ? (
            <>
                <div className="d-flex justify-content-center mt-4">
                <h3>Payment is successfull</h3>
                <img 
                    src={process.env.PUBLIC_URL + "/Images/status/payment-success.png"}
                    alt="success"
                    style={{width: "25%",}}
                />
                </div>

                <div className="d-flex justify-content-center m-4">
                    <b>Please don't click anything & stay on the page.......</b>
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

export default PaymentSuccess