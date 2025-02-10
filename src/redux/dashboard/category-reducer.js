import { categoryAPI } from '../../api/apiCategory'

const GET_CATEGORY = 'GET_CATEGORY';
const GET_RESET= 'GET_RESET';

let initialState = {
    categoryData: []
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORY: {
            return {
                ...state,
                categoryData: [...state.categoryData,  ...action.data ]
            };
        }
        case GET_RESET: {
            return {
                ...state,
                categoryData: []
            };
        }
        default:
            return state;
    }
};

export const getCategoryhActionCreater = (data) => ({ type: GET_CATEGORY, data });
export const getResetActionCreater = () => ({ type: GET_RESET });

export const getCategoryThunkCreator = (category) => async  (dispatch) => {
    try{
        
        const data = await categoryAPI.getCategory(category)
        console.log(data)
        dispatch(getCategoryhActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};

export const resetCategory = () =>(dispatch) => {
    dispatch(getResetActionCreater())
}

export default categoryReducer;