import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet'
import { useSnackbar } from 'notistack'
import 'leaflet-routing-machine/dist/leaflet-routing-machine'
import axios from "../../../../config/axios"

const MapComponent = ({address, userId}) => {
    const { enqueueSnackbar } = useSnackbar()

    const [useRAddress, setUseRAddress] = useState([])
    const [lattitude, longitude] = address[0].location.coordinates
 
    useEffect(()=>{
        (async ()=>{
            try{
                const {data} = await axios.get(`/api/user-address/${userId}`, {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                })
                setUseRAddress(data.location.coordinates)
            }catch(err){
                enqueueSnackbar( err.response.data.error || err.message, {
                    variant: 'error',
                    autoHideDuration: 3000, 
                })
            }
        })()
    }, [])

    useEffect(() => {
        if(useRAddress.length > 0){
            const map = L.map('map').setView([0, 0], 2)

             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

            const userAddress = [useRAddress[0], useRAddress[1]]
            const serviceProviderAddress = [lattitude, longitude]

            // Add markers for user and service provider
            L.marker(userAddress).addTo(map).bindPopup('🏠 User Address');
            L.marker(serviceProviderAddress).addTo(map).bindPopup('🙂 Service Provider Address');


            // Set up routing control
            L.Routing.control({
            waypoints: [
                L.latLng(userAddress),
                L.latLng(serviceProviderAddress)
            ],
        
            routeWhileDragging: true
            }).addTo(map)
        }
    }, [useRAddress])

    return <div id="map" 
        style={{width: '100%', height: '400px' }} 
    />
}

export default MapComponent
