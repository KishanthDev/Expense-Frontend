import { useSelector } from "react-redux"
import CategoryList from "./CategoryList"

export default function CategoryItem(){
    const {data} = useSelector(state=>state.categories)
    return(
        <>
        <h2>CategoryItem</h2>
        {data.map(ele=>(
            <CategoryList key={ele?._id} {...ele} />
        ))}
        </>
    )
}