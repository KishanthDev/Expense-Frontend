import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

export default function CategoryContainer({categories}){
    return(
        <>
        <h4>Category length - {categories.data.length}</h4>
        < CategoryForm />
        < CategoryList  />
        </>
    )
}