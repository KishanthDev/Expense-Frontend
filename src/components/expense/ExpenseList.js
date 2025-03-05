import ExpenseItem from "./ExpenseItem";
import { useContext } from "react";
import ExpenseContext from "../Context/ExpenseContext";
export default function ExpenseList(){
    const {expenses} = useContext(ExpenseContext)
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
                {expenses.data.length > 0 ? expenses.data.map(ele=>(
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