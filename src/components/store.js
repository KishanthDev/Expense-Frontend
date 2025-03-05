import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/categorySlice"
import expenseReducer from "./slices/expenseSlice"

const store = configureStore({
    reducer:{
        categories:categoryReducer,
        expenses:expenseReducer
    }
})


export default store