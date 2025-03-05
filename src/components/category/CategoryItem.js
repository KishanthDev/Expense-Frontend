import axios from "axios"
import { useContext } from "react"
import CategoryContext from "../Context/CategoryContext"
export default function CategoryItem({name,_id}){
    const {categoryDispatch,expenseDispatch,expenses} = useContext(CategoryContext)
    const handleRemove = async() =>{
        const alert = window.confirm("Removing Category will remove their related Expenses too")
        if(alert){
            try {
                const response = await axios.delete(`http://localhost:3030/categories/${_id}`)
                categoryDispatch({type:"remCat",payload:response.data._id})
                expenseDispatch({type:"setExp",payload:expenses.data.filter(expense=>expense.category!==response.data._id)})
            } catch (err) {
                console.log(err);
            }
        }
    }
    return(
        <>
        <li>
            {name} <button onClick={handleRemove}>Remove</button>
        </li>
        </>
    )
}