const GET_CART = 'GET_CART';
const DEL_CART = 'DEL_CART';
const DOWN_CART = 'DOWN_CART';
const ADD_CART = 'ADD_CART';

let initialState = {
    cartData: [], 
    currentCart: 0,
    totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CART: {
            return {
                ...state,
                currentCart: state.currentCart + 1, 
                totalPrice: state.totalPrice + action.price,
                cartData: [...state.cartData, { ...action.data, quantity: 1 }]
            };
        }
        case DOWN_CART: {
            return {
                ...state,
                cartData: state.cartData.map(item => {
                    if (item.id === action.data.id) {
                        
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item;
                }),
                currentCart: state.currentCart - 1
            };
        }
        case ADD_CART: {
                return {
                    ...state,
                    cartData: state.cartData.map(item => {
                        if (item.id === action.data.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1 
                            };
                        }
                        return item;
                    }),
                    currentCart: state.currentCart + 1 
                };
            
        }
        case DEL_CART: {
            return {
                ...state,
                currentCart: state.currentCart - action.countTicket,
                cartData: state.cartData.filter(item => item.id !== action.data.id)
            };
        }
        default:
            return state;
    }
};

export const getCartActionCreater = (data, price) => ({ type: GET_CART, data, price });
export const delCartActionCreater = (data, countTicket) => ({ type: DEL_CART, data, countTicket });
export const downCurrentActionCreater = (data) => ({ type: DOWN_CART, data });
export const addCurrentActionCreater = (data) => ({ type: ADD_CART, data });

export const getCartThunkCreator = (data) => (dispatch) => {
    const price = +data.price;
    dispatch(getCartActionCreater(data, price));
};

export const downCurrentCart = (data) => (dispatch) => {
    dispatch(downCurrentActionCreater(data));
};

export const addCurrentCart = (data) => (dispatch) => {
    dispatch(addCurrentActionCreater(data));
};

export const delCartThunkCreator = (data, ticketQuantities) => (dispatch) => {
    const countTicket = ticketQuantities[data.id] || 1;
    dispatch(delCartActionCreater(data, countTicket));
};

export default cartReducer;
