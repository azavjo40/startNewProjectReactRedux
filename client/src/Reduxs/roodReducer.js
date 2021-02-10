//@ts-check
import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { basketReducer } from './basketReducer'
import { generalReducer } from './generalReducer'
import { menuReducer } from './menuReducer'
import { orderReducer } from './orderReducer'
import { contsactReducer } from './contactReducer'

export const roodReducer = combineReducers({
    // тут будить хранилешь 
    auth: authReducer
    , menu: menuReducer
    , general: generalReducer
    , basket: basketReducer
    , order: orderReducer
    , contact: contsactReducer
})