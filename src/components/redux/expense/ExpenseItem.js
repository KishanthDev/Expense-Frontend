import { useDispatch, useSelector } from "react-redux"
import { expId, removeExpense } from "../../slices/expenseSlice"

export default function ExpenseItem({expenseDate,amount,category,_id}){
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.categories)
    const formattedDate = new Date(expenseDate).toLocaleDateString("en-US")
    const handleEdit=()=>{
        dispatch(expId(_id))
    }
    const handleRemove = ()=>{
        dispatch(removeExpense(_id))
    }
    const fetchCategories = (category)=>{
       const response = data.find(ele=>ele._id===category)
       return response?response.name:"unknown"
    } 
    
    return(
        <>
        <tr>
            <td>{formattedDate}</td>
            <td>{amount}</td>
            <td>{fetchCategories(category)}</td>
            <td><button onClick={handleEdit}>Edit</button> <button onClick={handleRemove}>Remove</button></td>
        </tr>
        </>
    )
}