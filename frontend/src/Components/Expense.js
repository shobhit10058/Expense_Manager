import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

function Expense({ userDetails, setUserDetails, ...rest }) {
  const savedCurrentExpenses = useRef(0); // stores the expenses saved in server
  const [state, setState] = useState({ leftCategories: [], currentExpenses: [], addExpenseAmount: 0, addCategory: "Select a Category" }); // stores values shown which are being edited

  const initialize = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/currentExpenses/`);
      if (res.status === 200) {
        const { data } = res;
        savedCurrentExpenses.current = data.data;
        setState({
          currentExpenses: data.data, leftCategories: [...userDetails.categories.filter((category) => {
            const found = data.data.find((entry) => {
              return entry.category === category;
            })
            return found === undefined;
          })]
        })
      }
    } catch (e) {
      
    }
  }

  useEffect(() => {
    initialize();
  }, [])

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      if (state.addCategory === "Select a Category")
        return;
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/expense/new/`, { category: state.addCategory, amount: state.addExpenseAmount });
      if (res.status === 200) {
        const { data } = res;
        setUserDetails((userDetails) => {
          return {
            ...userDetails,
            amountLeft: userDetails.amountLeft - state.addExpenseAmount
          }
        });
        const newExpense = { category: state.addCategory, amount: state.addExpenseAmount, id: data.id, deleted: false};
        if(!savedCurrentExpenses.current)
          savedCurrentExpenses.current = [];
        savedCurrentExpenses.current = [...savedCurrentExpenses.current, newExpense];
        
        setState((state) => {
          return {
            leftCategories: [...state.leftCategories.filter((category) => category !== state.addCategory)],
            currentExpenses: [...state.currentExpenses, newExpense],
            addCategory: "Select a Category",
            addExpenseAmount: 0
          }
        });
        alert(data.message);
      }
    } catch (e) {
      console.log(e)
      alert(e.response.data.message);
    }
  }

  const updateExpense = async (e, index) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/expense/update/${state.currentExpenses[index].id}`, { amount: state.currentExpenses[index].amount });
      if (res.status === 200) {
        setUserDetails({ ...userDetails, amountLeft: userDetails.amountLeft - state.currentExpenses[index].amount + savedCurrentExpenses.current[index].amount });
        savedCurrentExpenses.current[index] = state.currentExpenses[index];
        alert(res.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const handleReset = (e, index) => {
    setState(
      {
        ...state,
        currentExpenses:
          [...state.currentExpenses.slice(0, index),
          savedCurrentExpenses.current[index],
          ...state.currentExpenses.slice(index + 1)]
      });
  }

  const handleChangeExpense = (e, index) => {
    setState(
      {
        ...state,
        currentExpenses:
          [...state.currentExpenses.slice(0, index),
          { ...state.currentExpenses[index], amount: parseInt(e.target.value) },
          ...state.currentExpenses.slice(index + 1)]
      });
  }

  const toggleDeleteExpense = async (e, index) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/expense/update/${state.currentExpenses[index].id}`, { deleted: !state.currentExpenses[index].deleted});
      if (res.status === 200) {
        setUserDetails({ ...userDetails, amountLeft: userDetails.amountLeft - (2 * state.currentExpenses[index].deleted - 1) * state.currentExpenses[index].amount});
        setState(
          {
            ...state,
            currentExpenses:
              [...state.currentExpenses.slice(0, index),
              { ...state.currentExpenses[index], deleted: !state.currentExpenses[index].deleted},
              ...state.currentExpenses.slice(index + 1)]
          });
        alert(res.data.message);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }


  return (
    <div className="container mt-5" >
      <h1 className="display-2 text-center text-primary mt-2 mb-5">Manage Expenses</h1>

      <div className='d-flex justify-content-between'>
        <div>
          <h2 className="display-6 text-center text-dark">Add Expense</h2>
          <div className="container d-flex justify-content-center align-items-center">
            <div className='p-2'><span className='text-capitalize fw-semibold'>Amount Left: </span></div>
            <Form.Control type="number" placeholder="Amount Left" value={userDetails.amountLeft} style={{ width: "100px" }} readOnly />
          </div>
          <select className="form-select mt-3" value={state.addCategory} onChange={(e) => setState({ ...state, addCategory: e.target.value })}>
            <option selected>Select a category</option>
            {
              state.leftCategories.map((category) => {
                return (
                  <option value={category} key={category}>{category}</option>
                )
              })
            }
          </select>
          <div className="container d-flex justify-content-center align-items-center mt-2">
            <div className='p-2'><span className='text-capitalize fw-semibold'>Amount: </span></div>
            <Form.Control type="number" placeholder="amount" value={state.addExpenseAmount} style={{ width: "100px" }} onChange={(e) => setState({ ...state, addExpenseAmount: parseInt(e.target.value) })} />
            <Button className="btn-primary ms-2" onClick={addExpense}>Add</Button>
          </div>
        </div>
        <div>
          <h2 className="display-6 text-center text-dark">Current Expenses</h2>
          {
            state.currentExpenses.map((expense, index) => {
              return (
                <div key={index} className="mt-2">
                  <div className="container d-flex justify-content-center align-items-center">
                    <div className='p-2'><span className={`text-capitalize fw-semibold ${expense.deleted ? "text-decoration-line-through":""}`}>{expense.category}</span></div>
                    <Form.Control type="number" placeholder="amount" value={expense.amount} style={{ width: "100px" }} onChange={(e) => handleChangeExpense(e, index)} />
                    {!expense.deleted && <Button className="btn-warning ms-1" onClick={(e) => handleReset(e, index)}  >Reset</Button>}
                    {!expense.deleted && <Button className="btn-danger ms-1" onClick={(e) => updateExpense(e, index)} >Update</Button>}
                    <Button className={`btn-${expense.deleted ? "danger":"primary"} ms-1`} onClick={(e) => toggleDeleteExpense(e, index)}>{expense.deleted ? "Undo Delete": "Delete"}</Button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Expense