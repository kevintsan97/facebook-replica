import { AUTH, LOGOUT} from '../constants/actionTypes'

const authReducer = (state ={authData : null}, action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile',JSON.stringify(action?.data))
            return {state, authData: action?.data}

        case LOGOUT:
            console.log("1111")
            localStorage.clear()
            console.log("2222")
            return {state, authData: null}
            
        default:
            return state
    }
}

export default authReducer