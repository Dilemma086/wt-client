import {localDashBoarAPI} from '../../api/apiLocat'
import { selectPageSize } from './settingDBoard-reducer'
import { locatAPI } from '../../api/apiLocatClient'

const GET_LOCAT_DATA = 'GET_LOCAT_DATA';
const SET_LOCAT_DATA = 'SET_LOCAT_DATA';
const SET_LOCAT_TOTAL = 'SET_LOCAT_TOTAL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

let initialState = {
    locatData: [],
    currentPage: 1,
    totalLocals: 0
}

const locationDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case GET_LOCAT_DATA:{
                return {...state, 
                    locatData:  action.data
                }
            }
            case SET_LOCAT_DATA:
                return { ...state, locatData: [...state.locatData, action.data] };
            case SET_LOCAT_TOTAL:{
                    return {...state, 
                        totalLocals:  action.total
                    }
                }
            case SET_CURRENT_PAGE:{   
                return {...state, 
                    currentPage: action.currentPage
                }
            } 
            default:
                return state 
    }
}

export const getDashBoardLocalsActionCreater = (data) => ({ type: GET_LOCAT_DATA, data })
export const setDashBoardLocalsActionCreater = (data) => ({ type: SET_LOCAT_DATA, data })
export const setTotalLocals = (total) => ({ type: SET_LOCAT_TOTAL, total })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })


// client 
export const getLocatsThunkCreator = ()  =>(dispatch)=>{
    locatAPI.getLocats()
        .then(data =>{
            dispatch(getDashBoardLocalsActionCreater(data));
        })
        .catch(error => {
            console.log(error);
        })
}
// end

export const getDashBoardLocalsThunkCreator = (currentPage = 1)  =>(dispatch, getState)=>{
    const pageSize = selectPageSize(getState()); 
    dispatch(setCurrentPage(currentPage))
    localDashBoarAPI.getLocals()
        .then(data =>{
            dispatch(setTotalLocals(data.length))
            dispatch(getDashBoardLocalsActionCreater(data.splice(pageSize*(currentPage -1), pageSize)));
        })
        .catch(error => {
            console.log(error);
        })
}

export const setDashBoardLocalsThunkCreator = (name, description, street, dom, metro, map, image)  => (dispatch) =>{
    localDashBoarAPI.setLocals(name, description, street, dom, metro, map, image)
        .then(data =>{
            dispatch(setDashBoardLocalsActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}
export const updateDashBoardLocalsThunkCreator = (name, description, street, dom, metro, map, image, id)  => (dispatch) =>{
    localDashBoarAPI.updateLocals(name, description, street, dom, metro, map, image, id)
        .then(data =>{
            
            dispatch(setDashBoardLocalsActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}

export const deleteDashBoardLocalsThunkCreator = (id)  => (dispatch) =>{
        localDashBoarAPI.deleteLocals(id)
        .then(data =>{
            console.log(data)
        })
        .catch(error => {
            console.log(error);
        })
}

export default locationDBoardReducer