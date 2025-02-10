import { categDashBoarAPI } from '../../api/apiCategor'
import { categorAPI } from '../../api/apiCategorClient'

const GET_CATEG_DATA = 'GET_CATEG_DATA';

let initialState = {
    categData: []
}

const categDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case GET_CATEG_DATA:{
                return {...state, 
                    categData:  action.data
                }
            }
            
            default:
                return state 
    }
}

export const getDashBoardCategActionCreater = (data) => ({ type: GET_CATEG_DATA, data })

// client 
export const getCategorsThunkCreator = ()  =>(dispatch)=>{
    categorAPI.getCategors()
        .then(data =>{
            dispatch(getDashBoardCategActionCreater(data));
        })
        .catch(error => {
            console.log(error);
        })
}
// end 


export const getDashBoardCategThunkCreator = ()  =>(dispatch)=>{
    categDashBoarAPI.getCategs()
        .then(data =>{
            dispatch(getDashBoardCategActionCreater(data));
        })
        .catch(error => {
            console.log(error);
        })
}


export default categDBoardReducer