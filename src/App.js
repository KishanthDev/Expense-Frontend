import ExpenseContainer from "./components/expense/ExpenseContainer";
import CategoryContainer from "./components/category/CategoryContainer";
import CategoryContext from "./components/Context/CategoryContext";
import ExpenseContext from "./components/Context/ExpenseContext";
import {useReducer,useEffect}from "react"
import axios from "axios"
const categoryInitial =  {
  data:[],
  serverErrors:null
}
const expenseInitial ={
  data : [],
  expId:null,
  serverErrors:null
}
const categoryReducer = (state,action)=>{
  switch(action.type){
    case"setCat":{
      return{...state,data:action.payload}
    }
    case"addCat":{
      return{...state,data:[...state.data,action.payload]}
    }
    case"remCat":{
      return{...state,data:state.data.filter(ele=>ele._id!==action.payload)}
    }
    default:{
      return state
    }
  }
}
const expenseReducer = (state,action)=>{
    switch(action.type){
      case"setExp":{
        return{...state,data:action.payload}
      }
      case"addExp":{
        return{...state,data:[...state.data,action.payload]}
      }
      case"remExp":{
        return{...state,data:state.data.filter(ele=>ele._id!==action.payload)}
      }
      case"editExp":{
        return{...state,expId:action.payload}
      }
      case"upExp":{
        return{...state,expId:null,data:state.data.map((ele)=>{
          if(ele._id===action.payload._id){
            return action.payload
          }else{
            return ele
          }
        })}
      }
      default:{
        return state
      }
    }
}
function App() {
  useEffect(()=>{
      axios.get("http://localhost:3030/categories")
      .then((response)=>{
        categoryDispatch({type:"setCat",payload:response.data})
      })
      .catch((err)=> {
        console.log(err.message);
      })
  },[])
    useEffect(()=>{
      axios.get("http://localhost:3030/expenses")
      .then((response)=>{
        expenseDispatch({type:"setExp",payload:response.data})
      })
      
      .catch((err)=> {
        console.log(err.message);
      })
  },[])
  const [categories,categoryDispatch]=useReducer(categoryReducer,categoryInitial)
  const [expenses,expenseDispatch] = useReducer(expenseReducer,expenseInitial)
  return(
    <>
    <h3>Category</h3>
 
    < CategoryContext.Provider value={{categories,categoryDispatch,expenseDispatch,expenses}}>
    < CategoryContainer categories={categories}/>
    </CategoryContext.Provider>
    
  
    < ExpenseContext.Provider value={{expenses,categories,expenseDispatch}}>
    < ExpenseContainer expenses = {expenses}/>
    </ExpenseContext.Provider>
    </>
  )
}

export default App;