const SET_PAGINAT = 'SET_PAGINAT';

let initialState = {
    paginat: 1,
    pageSize: 10
}

const settingDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case SET_PAGINAT:{
                return {...state, 
                    paginat: action.num
                }
            }
            default:
                return state 
    }
}

export const setDashBoardPaginatActionCreater = (num) => ({ type: SET_PAGINAT, num })

export const paginatDashBoardThunkCreator = (num)  => (dispatch)=>{
            dispatch(setDashBoardPaginatActionCreater(num))
}
export const selectPageSize = (state) => state.settingDB.pageSize;

export default settingDBoardReducer