import { combineReducers} from "redux"
import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import{getAllPizzasReducer,
    addPizzaReducer,
    getPizzaByIdReducer,
    updatePizzaByIdReducer} from "./reducers/pizzaReducer"
import {cartReducer} from "./reducers/cartReducer"
import { registerReducer, loginReducer,
    getAllUsersReducer, } from "./reducers/userReducer"
import { placeOrderReducer,myOrdersReducer,
    allUserOrdersReducer, } from "./reducers/orderReducer"

const rootReducer = combineReducers({
    getAllPizzasReducer:getAllPizzasReducer,
    cartReducer:cartReducer,
    registerReducer:registerReducer,
    loginReducer:loginReducer,
    placeOrderReducer:placeOrderReducer,
    myOrdersReducer:myOrdersReducer,
    addPizzaReducer: addPizzaReducer,
    getPizzaByIdReducer: getPizzaByIdReducer,
    updatePizzaByIdReducer: updatePizzaByIdReducer,
    allUserOrdersReducer: allUserOrdersReducer,
    getAllUsersReducer: getAllUsersReducer,
});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

//if there is some data then convert it into JSON array else leave it as an emty array
//we need to convert because while storing in local storage we had converted it into JSON string for browser

const initialstate={

    cartReducer : {
        cartItems : cartItems
    },

    loginReducer :{
        currentUser : currentUser
    },

}


const middleware = [thunk];
const store = configureStore({
reducer:rootReducer, preloadedState:initialstate, middleware:middleware
})
export default store;