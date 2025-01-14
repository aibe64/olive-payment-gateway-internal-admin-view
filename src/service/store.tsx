import {  legacy_createStore as createStore } from 'redux'
import { AllReducers } from "../service/reducers";



const store = createStore(AllReducers)
export default store   
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>