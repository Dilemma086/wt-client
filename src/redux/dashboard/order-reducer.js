import { orderAPI } from '../../api/apiOrder'

const SET_ORDER = 'SET_ORDER';
const GET_ORDER = 'GET_ORDER';
const GET_ONE_ORDER = 'GET_ONE_ORDER';
const RESET_ORDER = 'RESET_ORDER'

let initialState = {
    ordersData: [],
    orderData: [] 
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDER: {
            return {
                ...state,
                ordersData: [...state.ordersData, { ...action.data }]
            };
        }
        case GET_ORDER: {
            return {
                ...state,
                ordersData: [...state.ordersData, ...action.data]
            };
        }
        case GET_ONE_ORDER: {
            return {
                ...state,
                orderData: action.data
            };
        }
        case RESET_ORDER: {
            return {
                ...state,
                ordersData: []
            };
        }
        default:
            return state;
    }
};

export const setOrderActionCreater = (data) => ({ type: SET_ORDER, data });
export const getOrdersActionCreater = (data) => ({ type: GET_ORDER, data });
export const getOrderActionCreater = (data) => ({ type: GET_ONE_ORDER, data });
export const getAllOrdersActionCreater = (data) => ({ type: GET_ORDER, data });
export const updateOrderStatusActionCreater = (data) => ({ type: GET_ORDER, data });
export const resetOrdersActionCreater = () => ({ type: RESET_ORDER });

export const setOrderThunkCreator = (tickets, userId) => async (dispatch) => {
    try{
        const data = await orderAPI.setOrder(tickets, userId)
        dispatch(setOrderActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};
export const getOrdersThunkCreator = (userId) => async  (dispatch) => {
    try{
        
        const data = await orderAPI.getOrders(userId)
        dispatch(getOrdersActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};
export const getAllOrdersThunkCreator = () => async  (dispatch) => {
    try{
        
        const data = await orderAPI.getAllOrders()
        dispatch(getAllOrdersActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};

export const getOrderThunkCreator = (userId, orderId) => async  (dispatch) => {
    try{
        const data = await orderAPI.getOrder(userId, orderId)
        dispatch(getOrderActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};
export const updateOrderStatus = (orderId, newStatus, quantity) => async  (dispatch) => {
    try{
        debugger
        const data = await orderAPI.updateOrder(orderId, newStatus, quantity)
        dispatch(updateOrderStatusActionCreater(data))
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
};


export const resetOrders = () =>(dispatch) => {
    dispatch(resetOrdersActionCreater())
}

export default orderReducer;