import axios from "axios"
import {useState} from "react"
import { useContext } from "react"
import CategoryContext from "../Context/CategoryContext"
export default function CategoryForm(){
    const {categoryDispatch} = useContext(CategoryContext)
    const [name,setName] = useState("")
    const [clientErrors,setClientErrors] = useState({})
    const [serverError,setServerErrors] = useState([])
    const errors = {}
    const runClientSideValidation = ()=>{
        if(name.trim().length===0){
            errors.name = "Name should not be empty"
        }else if(name.length<3||name.length>20){
            errors.name = "Name should be 3 - 20 char"
        }
    }
    const forms = {
        name
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        runClientSideValidation()
        if(Object.keys(errors).length!==0){
            setClientErrors(errors)
        }else{
            setClientErrors({})
            try {
                const response = await axios.post("http://localhost:3030/categories",forms)
                categoryDispatch({type:"addCat",payload:response.data})
                setName("")
            } catch (err) {
                console.log(err.response.data.errors)
                setServerErrors(err.response.data.errors)
            }
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            {clientErrors.name&&<span style={{color:"red",fontSize:"small"}}>{clientErrors.name}</span>}
            {serverError.length > 0 &&serverError.map((error,id)=>{
                return <span key={id} style={{color:"red",fontSize:"small"}}>{error.msg}</span>
            })}<br/>
            <input type="submit" />
        </form>
        </>
    )
}