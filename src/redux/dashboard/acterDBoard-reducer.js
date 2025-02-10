import { acterDashBoarAPI } from '../../api/apiActer'

const GET_ACTER_DATA = 'GET_ACTER_DATA';
const SET_ACTER_DATA = 'SET_ACTER_DATA';
const SET_ACTER_TOTAL = 'SET_ACTER_TOTAL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

let initialState = {
    acterData: [],
    currentPage: 1,
    totalActers: 0
}

const acterDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case GET_ACTER_DATA:{
                return {...state, 
                    acterData:  action.data
                }
            }
            case SET_ACTER_DATA:
                return { ...state, acterData: [...state.acterData, action.data] };
            case SET_ACTER_TOTAL:{
                    return {...state, 
                        totalActers:  action.total
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

export const getDashBoardActersActionCreater = (data) => ({ type: GET_ACTER_DATA, data })
export const setDashBoardActersActionCreater = (data) => ({ type: SET_ACTER_DATA, data })
export const setTotalActers = (total) => ({ type: SET_ACTER_TOTAL, total })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const getDashBoardActersThunkCreator = (currentPage = 1)  =>(dispatch)=>{
    
    dispatch(setCurrentPage(currentPage))
    acterDashBoarAPI.getActers()
        .then(data =>{
            dispatch(setTotalActers(data.length))
            dispatch(getDashBoardActersActionCreater(data));
        })
        .catch(error => {
            console.log(error);
        })
}

export const setDashBoardActersThunkCreator = (fierstname, secondname, description, image)  => (dispatch) =>{
    acterDashBoarAPI.setActers(fierstname, secondname, description, image)
        .then(data =>{
            acterDashBoarAPI.getActerById()
                .then((fullActerData) => {
                    dispatch(setDashBoardActersActionCreater(fullActerData))
                })
                .catch((error) => {
                    console.error(`Произошла ошибка при получении данных об актере: ${error.message}`);
                });
        })
        .catch(error => {
            console.log(error);
        })
}
export const updateDashBoardActersThunkCreator = (fierstname, secondname, description, image, id)  => (dispatch) =>{
    acterDashBoarAPI.updateActers(fierstname, secondname, description, image, id)
        .then(data =>{
            
            dispatch(setDashBoardActersActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}

export const deleteDashBoardActersThunkCreator = (id)  => (dispatch) =>{
    acterDashBoarAPI.deleteActers(id)
        .then(data =>{
            console.log(data)
        })
        .catch(error => {
            console.log(error);
        })
}

export default acterDBoardReducer