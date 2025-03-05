export default function ExpenseControl(){
    return(
        <>
        <form>
            <input type="search" placeholder="Search"></input>
            <select>
                <option value="">Sort By</option>
                <option value="Amount--Low to High">Amount--Low to High</option>
                <option value="Amount--High to Low">Amount--High to Low</option>
                <option value="Newest">Newest first</option>
            </select>
        </form>
        </>
    )
}