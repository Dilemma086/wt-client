import {authAPI} from '../api/api'

const LOGIN_AUTH = 'LOGIN_AUTH'
const RESET_AUTH = 'RESET_AUTH'
const LOGOUT = 'LOGOUT'
const LOGIN_ERROR = 'LOGIN_ERROR'

let initialState = {
    isAuth: false,
    user: false,
    error: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
            case LOGIN_AUTH:{
                
                return {...state, 
                    isAuth: true,
                    user: action.data,
                    error: false
                }
            }
            case RESET_AUTH:{
                return {...state, 
                    error: false,
                }
            }
            case LOGOUT:{
                return {...state,
                    user: false, 
                    isAuth: false,
                    error: false
                }
            }
            case LOGIN_ERROR:{
                return {...state, 
                    isAuth: false,
                    error: action.payload.errorMessage
                }
            }
            default:
                return state 
    }
}

export const AuthUser = (data) => ({ type: LOGIN_AUTH, data })
export const AuthReset = () => ({ type: RESET_AUTH })
export const AuthLogout = () => ({ type: LOGOUT })
export const AuthError = (errorMessage) => ({ type: LOGIN_ERROR, payload: { errorMessage } })


export const loginAuthThunkCreator = (email, password)  =>async (dispatch)=>{
    try{
        const data = await authAPI.loginAuth(email, password)
        dispatch(AuthUser(data))
    }
    catch (error) {
        const errorMessage = error.message;
        const user = error.user;
        dispatch(AuthError(errorMessage, user));
    }
}

export const infoAuthThunkCreator = (userId)  =>(dispatch)=>{
    authAPI.infoAuth(userId)
    
        .then(data =>{
            
            dispatch(AuthUser(data))
        })
        .catch(error => {
            const errorMessage = error.message;
            const user = error.user;
                dispatch(AuthError(errorMessage, user));
        })
}


export const regUserThunkCreator = (email, password) =>(dispatch)=>{
    authAPI.postRegUser(email, password)
        .then(response =>{
            dispatch(AuthUser(response.data.data))})
        .catch(error => {
            const errorMessage = error.message;
            dispatch(AuthError(errorMessage));
        }) 
}

export const resetAuthThunkCreator = (email, password) =>(dispatch)=>{
    authAPI.postResetAuth(email, password)
        .then(response =>{
            dispatch(AuthReset(response.data))})
        .catch(error => {
            const errorMessage = error.message;
            dispatch(AuthError(errorMessage));
        })  
}
export const logoutThunkCreator = () => (dispatch) => {
    dispatch(AuthLogout())
}


export default authReducer
