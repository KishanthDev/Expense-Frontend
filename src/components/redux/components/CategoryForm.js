import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategories, updateCateegory } from "../../slices/categorySlice"
export default function CategoryForm(){
    const dispatch = useDispatch()
    const { data, editId,serverErrors} = useSelector(state=>state.categories)
    const [name,setName] = useState("")
    const [clientErrors,setClientErrors] = useState({})
    const errors = {}
    useEffect(()=>{
        if(editId){
            const findCategory = data.find(ele=>ele._id===editId)
            setName(findCategory.name)
        }
    },[editId,data])
    const runClientSideValidation = ()=>{
        if(name.trim().length===0){
            errors.name = "Name should not be empty"
        }else if(name.length<3||name.length>20){
            errors.name = "Name should be 3 - 20 char"
        }
    }
    const resetForm =()=> {
        setName("")
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        runClientSideValidation()
        if(Object.keys(errors).length!==0){
            setClientErrors(errors)
        }else{
            setClientErrors({})
            const forms={name}
            if(editId){
                dispatch(updateCateegory({editId,forms,resetForm}))
            }else{
                dispatch(addCategories({forms,resetForm}))
            }
        }
    }
    return(
        <>
        <h1>{editId?"Edit":"Add"}Category</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            {clientErrors.name&&<span style={{color:"red",fontSize:"small"}}>{clientErrors.name}</span>}
            {serverErrors&&<span style={{color:"red",fontSize:"small"}}>{serverErrors}</span>}<br/>
            <input type="submit" />
        </form>
        </>
    )
}