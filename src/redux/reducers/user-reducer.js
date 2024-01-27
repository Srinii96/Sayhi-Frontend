import { 
        SET_USER_DATA, 
        UPDATE_USER_PROFILE, 
        UPDATE_USER_PROFILE_PIC,
        SET_USER_ADDRESS,
        ADD_USER_ADDRESS,
        UPDATE_USER_ADDRESS
    } from "../actions/user-actions"

const initialValue = {
    profile: {},
    address: []
}

const userReducer = (state = initialValue, action)=>{
    switch(action.type){
        case SET_USER_DATA : {
            return {...state, profile: {...state.profile, ...action.payload}}
        }
        case UPDATE_USER_PROFILE_PIC : {
            return {...state, profile: {...state.profile, profilePicture: action.payload}}
        }
        case UPDATE_USER_PROFILE : {
            return {...state, profile: {...state.profile, mobileNumber: action.payload}}
        }
        case SET_USER_ADDRESS : {
            return {...state, address: action.payload}
        }
        case ADD_USER_ADDRESS : {
            return {...state, address:[...state.address, action.payload]}
        }
        case UPDATE_USER_ADDRESS: {
            return {...state, address:[action.payload]}
        }
        default: {
            return {...state}
        }
    }
}

export default userReducer

