import { searchAPI } from '../../api/apiSearch'

const GET_SEARCH = 'GET_SEARCH';


let initialState = {
    searchData: []
};

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH: {
            return {
                ...state,
                searchData: [...state.searchData,  ...action.data ]
            };
        }
        default:
            return state;
    }
};

export const getSearchActionCreater = (data) => ({ type: GET_SEARCH, data });

export const getSearchThunkCreator = (date, location) => async  (dispatch) => {
    try{
        const data = await searchAPI.getSearch(date, location)
        dispatch(getSearchActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};


export default searchReducer;