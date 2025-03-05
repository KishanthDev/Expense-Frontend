import ExpenseControl  from "./ExpenseControl"
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import { useMemo } from "react"
export default function ExpenseContainer({expenses}){
    const totalexpense = useMemo(()=>{
        expenses.data.reduce((ac,cv)=>{
            console.log("lop")
            return ac+Number(cv.amount)},0)
    },[expenses.data])
    return(
        <>
        <h3>Expenses</h3>
        <h4>Expense list - {expenses.data.length}</h4>
        < ExpenseControl  />
        < ExpenseList />
        <h4>Total Expense - {totalexpense}</h4>
        < ExpenseForm />
        </>
    )
}