const reducer = (state, action)=>{
    switch(action.type){
        case "SIGN_IN_TOGGLE": {
            return {...state, toggle:action.payload}
        }
        case "SET_CATEGORIES": {
            return {...state, categories: action.payload}
        }
        case "SET_SERVICES": {
            return {...state, services: action.payload}
        }
        case "ADD_SERVICE": {
            return {...state, services: [...state.services, {...action.payload}]}
        }
        case "USER_LOGGED_IN": {
            return {...state, userLoggedIn: action.payload}
        }
        case "SEARCH_CATEGORY": {
            return {...state, search: action.payload}
        }
        case "CLEAR_SEARCH": {
            return {...state, search: action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default reducer

