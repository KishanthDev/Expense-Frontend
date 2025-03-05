import CategoryItem from "./CategoryItem";
import { useContext } from "react";
import CategoryContext from "../Context/CategoryContext";
export default function CategoryList(){
    const {categories} = useContext(CategoryContext)
    return(
        <>
        <h4>Forms</h4>
        <ul>
            {
                categories.data.map(category=> {
                    return <CategoryItem 
                    key={category._id}
                    {...category}/>
                }
                )
            }
        </ul>
        </>
    )
}