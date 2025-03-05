import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "../config/axios"


export const fetchExpense = createAsyncThunk("expenses/fetchData",async()=>{
    const response = await axios.get("/expenses")
    return response.data
})

export const editExpense = createAsyncThunk("expenses/edit",async({expId,forms})=>{
    const response = await axios.put(`/expenses/${expId}`,forms)
    return response.data
})

export const removeExpense  = createAsyncThunk("expenses/delete",async(id)=>{
    const response = await axios.delete(`/expenses/${id}`)
    return response.data
})

export const addExpense = createAsyncThunk("expenses/add",async(forms)=>{
    const response = await axios.post("/expenses",forms)
    return response.data
})

const expenseSlice = createSlice({
    name:"expenses",
    initialState:{
        data:[],
        expId:null,
        serverErrors:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchExpense.fulfilled,(state,action)=>{
            state.data = action.payload
        })
        builder.addCase(editExpense.fulfilled,(state,action)=>{
            const updatedExpense = state.data.map(ele=>ele._id===action.payload._id?action.payload:ele)
            state.data = updatedExpense
        })
        builder.addCase(removeExpense.fulfilled,(state,action)=>{
            const updatedExpense = state.data.filter(ele=>ele._id!==action.payload._id)
            state.data = updatedExpense
        })
        builder.addCase(addExpense.fulfilled,(state,action)=>{
            state.data.push(action.payload)
        })
    },
    reducers:{
        expId:(state,action)=>{
        state.expId = action.payload
        }
    }
})

export const {expId} = expenseSlice.actions
export default expenseSlice.reducer
