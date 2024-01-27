import Swal from "sweetalert2"
import axios from "../../config/axios"

export const SET_USER_DATA = "SET_USER_DATA"
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE"
export const UPDATE_USER_PROFILE_PIC = "UPDATE_USER_PROFILE_PIC"
export const SET_USER_ADDRESS = "SET_USER_ADDRESS"
export const ADD_USER_ADDRESS = "ADD_USER_ADDRESS"
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS"

const setUserData = (data)=>{
    return {
        type: SET_USER_DATA,
        payload: data
    }
}

export const setUserAddress = (data)=>{
    return {
        type: SET_USER_ADDRESS,
        payload: data
    }
}

export const startGetUserData = ()=>{
    return async (dispatch)=>{
        try {
            const { data } = await axios.get("/api/user-data",  {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(setUserData(data))

            if(data.address.length > 0){
                dispatch(setUserAddress(data.address))
            }
        } catch(err){
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `Err getting user Info: ${err.message}`,
                text: err.message,
            })
        }
    }
}

export const updateUserProfilePic = (data)=>{
    return {
        type: UPDATE_USER_PROFILE_PIC,
        payload: data
    }
}

export const updateUserProfile = (data)=>{
    return {
        type: UPDATE_USER_PROFILE,
        payload: data
    }
}

export const addUserAddress = (data)=>{
    return {
        type: ADD_USER_ADDRESS,
        payload: data
    }
}

export const updateUserAddress = (data)=>{
    return {
        type: UPDATE_USER_ADDRESS,
        payload: data
    }
}

