import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "../config/axios"
export const fetchCategories = createAsyncThunk("categories/fetchdata",async()=>{
    const response = await axios.get("/categories")
    return response.data
})

export const removeCategory = createAsyncThunk("category/remove",async(id)=>{
    const response = await axios.delete(`/categories/${id}`)
    return response.data
})

export const updateCateegory = createAsyncThunk("categories/update",async({editId,forms,resetForm},{rejectWithValue})=>{
    try {
        const response = await axios.put(`/categories/${editId}`,forms)
        resetForm()
        return response.data
    } catch (err) {
        rejectWithValue(err.response.data.errors)
    }
})

export const addCategories = createAsyncThunk("categories/add",async({forms,resetForm},{rejectWithValue})=>{
    try {
        const response = await axios.post("/categories",forms)
        resetForm()
        return response.data
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.errors[0].msg)
    }
})

const categorySlice = createSlice({
    name:"category",
    initialState:{
        data:[],
        serverErrors:null,
        editId:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.data=action.payload
        })
        builder.addCase(removeCategory.fulfilled,(state,action)=>{
            const index = state.data.findIndex(ele=>ele._id===action.payload._id)
            state.data.splice(index,1)
        })
        builder.addCase(addCategories.fulfilled,(state,action)=>{
            state.data.push(action.payload)
        })
        builder.addCase(addCategories.rejected,(state,action)=>{
            state.serverErrors=action.payload
        })
        builder.addCase(updateCateegory.fulfilled,(state,action)=>{
            const updateCateegory = state.data.map(ele=>ele._id===action.payload._id?action.payload:ele)
            state.data = updateCateegory
            state.editId = null
        })
    },
    reducers:{
        editId:(state,action)=>{
            state.editId = action.payload
        }
    }
})

export const {editId} = categorySlice.actions

export default categorySlice.reducer
