import axios from "axios"
import { useContext } from "react"
import ExpenseContext from "../Context/ExpenseContext"
export default function ExpenseItem({expenseDate,amount,category,_id}){
    const formattedDate = new Date(expenseDate).toLocaleDateString("en-US")
    const {expenseDispatch,categories} = useContext(ExpenseContext)
    const fetchCategory = (category)=>{
        const response = categories.data.find(ele=>ele._id===category)
        return response?response.name:"unknow"
    }
    const handleRemove = async()=>{
        const response = await axios.delete(`http://localhost:3030/expenses/${_id}`)
        expenseDispatch({type:"remExp",payload:response.data._id})
    }
    const handleEdit = ()=>{
        expenseDispatch({type:"editExp",payload:_id})
    }
    return(
        <>
        <tr>
            <td>{formattedDate}</td>
            <td>{amount}</td>
            <td>{fetchCategory(category)}</td>
            <td><button onClick={handleEdit}>Edit</button> <button onClick={handleRemove}>Remove</button></td>
        </tr>
        </>
    )
}