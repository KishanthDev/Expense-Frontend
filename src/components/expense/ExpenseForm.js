import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {format} from "date-fns"
import ExpenseContext from "../Context/ExpenseContext";

const formInitial = {
    expenseDate: "",
    title: "",
    amount: "",
    category: "",
    description: ""
}

export default function ExpenseForm() {
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const runClientSideValidation = () => {
        if (!forms.expenseDate) {
            errors.expenseDate = "Date is required";
        }
        if (!forms.title) {
            errors.title = "Title field is empty";
        } else if (forms.title.length < 3) {
            errors.title = "Title has a minimum of 3 characters";
        }
        if (!forms.amount) {
            errors.amount = "Amount field is empty";
        } else if (forms.amount < 1) {
            errors.amount = "Amount must be a minimum of 1 Rs";
        }
        if (!forms.category) {
            errors.category = "Select a category";
        }
        setClientErrors(errors);
    };

    const { expenseDispatch, categories, expenses } = useContext(ExpenseContext);
    const [forms, setForms] = useState(formInitial);

    useEffect(() => {
        if (expenses.expId) {
            const findExp = expenses.data.find(ele => ele._id === expenses.expId);
            const formattedDate = format(new Date(findExp.expenseDate),'yyyy-MM-dd')

            setForms({
                expenseDate: formattedDate,
                title: findExp.title,
                amount: findExp.amount,
                category: findExp.category,
                description: findExp.description
            });
        }
    }, [expenses.expId,expenses.data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        runClientSideValidation();
        if (Object.keys(errors).length !== 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({});
            try {
               if(expenses.expId){
                const response = await axios.put(`http://localhost:3030/expenses/${expenses.expId}`,forms)
                expenseDispatch({type:"upExp",payload:response.data})
            }else{
                const response = await axios.post("http://localhost:3030/expenses", forms);
                expenseDispatch({ type: "addExp", payload: response.data });
            }
            setForms(formInitial);
            }
        catch (err) {
            console.log(err);
        }}
    };

    const formTitle = expenses.expId ? "Edit" : "New";

    return (
        <>
            <h3>{formTitle} Form</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label><br />
                <input
                    type="date"
                    value={forms.expenseDate}
                    max={new Date().toISOString().split("T")[0]}
                    id="date"
                    onChange={(e) => setForms({ ...forms, expenseDate: e.target.value })}
                />
                {clientErrors.expenseDate && <span style={{ color: "red", fontSize: "small" }}>{clientErrors.expenseDate}</span>}<br /><br />

                <label htmlFor="title">Title:</label><br />
                <input
                    type="text"
                    value={forms.title}
                    id="title"
                    onChange={(e) => setForms({ ...forms, title: e.target.value })}
                />
                {clientErrors.title && <span style={{ color: "red", fontSize: "small" }}>{clientErrors.title}</span>}<br /><br />

                <label htmlFor="amount">Amount:</label><br />
                <input
                    type="number"
                    value={forms.amount}
                    id="amount"
                    onChange={(e) => setForms({ ...forms, amount: Number(e.target.value) })}
                />
                {clientErrors.amount && <span style={{ color: "red", fontSize: "small" }}>{clientErrors.amount}</span>}<br /><br />

                <label htmlFor="category">Select Category:</label><br />
                <select
                    value={forms.category}
                    id="category"
                    onChange={(e) => setForms({ ...forms, category: e.target.value })}
                >
                    <option value="">--Category--</option>
                    {categories.data.map(ele => (
                        <option value={ele._id} key={ele._id}>{ele.name}</option>
                    ))}
                </select>
                {clientErrors.category && <span style={{ color: "red", fontSize: "small" }}>{clientErrors.category}</span>}<br /><br />

                <label htmlFor="description">Description:</label><br />
                <textarea
                    value={forms.description}
                    id="description"
                    onChange={(e) => setForms({ ...forms, description: e.target.value })}
                ></textarea><br />
                <input type="submit" />
            </form>
        </>
    );
}
