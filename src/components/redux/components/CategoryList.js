import { useDispatch } from "react-redux"
import { editId, removeCategory } from "../../slices/categorySlice"

export default function CategoryList({name,_id}){
    const dispatch = useDispatch()
    const handleRemove = ()=>{
        const confirm  = window.confirm("Are you sure")
        if(confirm){
            dispatch(removeCategory(_id))
        }
    }
    return(
        <>
        <ul>
            <li>{name}
                <button onClick={()=>dispatch(editId(_id))}>edit</button>
                <button onClick={handleRemove}>remove</button></li>
        </ul>
        </>
    )
}