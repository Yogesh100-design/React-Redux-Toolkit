import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./feautures/CounterSlice"

export default configureStore({
    reducer:{
       counter : CounterReducer
    }   
})
