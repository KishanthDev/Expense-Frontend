import { useDispatch, useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import { useEffect } from "react";
import { fetchExpense } from "../../slices/expenseSlice";
export default function ExpenseList(){
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.expenses)
    useEffect(()=>{
        dispatch(fetchExpense())
    },[dispatch])
    return(
        <>
         <table border={1}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map(ele=>(
                    < ExpenseItem 
                        key={ele._id} 
                       {...ele}
                     />
                )):(
                    <tr>
                        <td colSpan={4} style={{textAlign:"center"}}>No Expenses</td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}