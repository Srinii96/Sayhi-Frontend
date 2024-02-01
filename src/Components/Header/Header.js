import { Col, Navbar } from "reactstrap"
import { useEffect, useState } from "react"
import io from "socket.io-client"
import { jwtDecode } from "jwt-decode"
import { useSnackbar } from 'notistack'
import NavBar from "./NavBar"

const socket = io.connect("http://localhost:3699")

const Header = ()=>{
    const { enqueueSnackbar } = useSnackbar()

    const [userId, setUserId] = useState("")

    useEffect(()=>{
        socket.emit("joinRoom", userId)
    }, [userId])

   useEffect(()=>{
    socket.on("approved", (data)=>{
        alert(data)
        enqueueSnackbar( data, {
            variant: 'info',
            autoHideDuration: 5000, 
        })
    })
   }, [socket])

   useEffect(()=>{
       socket.on("rejected", (data)=>{
        enqueueSnackbar( data, {
            variant: 'warning',
            autoHideDuration: 5000, 
        })
    })
   }, [socket])

    useEffect(()=>{
        if(localStorage.length > 0){
            const { id } = jwtDecode(localStorage.getItem("token"))
            setUserId(id)
        }
    }, [])

    return(
        <Col>
            <Navbar>
                <NavBar />
            </Navbar>
        </Col>
    )
}

export default Header