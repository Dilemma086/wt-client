import {combineReducers, legacy_createStore, applyMiddleware} from "redux"
import authReducer from './../redux/auth-reducer'
import locationDBoardReducer from './../redux/dashboard/locationDBoard-reducer'
import acterDBoardReducer from './../redux/dashboard/acterDBoard-reducer'
import eventDBoardReducer from './../redux/dashboard/eventDBoard-reducer'
import categDBoardReducer from './../redux/dashboard/categDashBoard-reducer'
import ticketDBoardReducer from './dashboard/ticketDBoard-reducer'
import orderReducer from './dashboard/order-reducer'
import searchReducer from './dashboard/search-reducer'
import cartReducer from './dashboard/cart-reducer'
import categoryReducer from './dashboard/category-reducer'

import settingDBoardReducer from './../redux/dashboard/settingDBoard-reducer'

import {thunk} from 'redux-thunk'

let redusers = combineReducers({
    auth: authReducer,
    locat: locationDBoardReducer,
    acter: acterDBoardReducer,
    event: eventDBoardReducer,
    categor: categDBoardReducer,
    ticket: ticketDBoardReducer,
    cart: cartReducer,
    order: orderReducer,
    search: searchReducer,
    category: categoryReducer,
    settingDB: settingDBoardReducer
})

let store = legacy_createStore(redusers, applyMiddleware(thunk))
window.store = store

export default store