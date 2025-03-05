import { useEffect } from "react"
import { fetchCategories } from "../../slices/categorySlice"
import { useDispatch, useSelector } from "react-redux"
import CategoryItem from "./CategoryItem"
import CategoryForm from "./CategoryForm"
export default function CategoryContainer(){
    const {data} = useSelector((state)=>state.categories)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCategories())
    },[dispatch])
    return(
        <>
        <h1>categories - {data.length}</h1>
        <CategoryItem/>
        <CategoryForm/>
        </>
    )
}