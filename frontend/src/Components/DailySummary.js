import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";

function DailySummary() {

	const [dailyExpense, setDailyExpense] = useState(null);
	
	const getCurrentExpenses = async () => {
		try{
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/currentExpenses/`);
			if (res.status === 200) {
				let data = res.data.data;
				data = data.filter((expense) => !expense.deleted);
				if(data.length > 0){
					setDailyExpense([['Category', 'Amount'], ...data.map((expense) => {
						return [expense.category, expense.amount];
					})])
				}
			}
		}catch(e){
			
		}
	}

	useEffect(() => {
		getCurrentExpenses();
	}, [])

	return (
		<div className='container d-flex flex-column justify-content-center align-items-center'>
		<h1 className='text-center text-primary display-4 mt-3'>Daily Summary</h1>
		{
			dailyExpense?
			(<Chart
				chartType="PieChart"
				data={dailyExpense}
				width={"100%"}
				height={"400px"}
			/>):<p className='text-center mt-3 fs-4'>No Expense Made Today!</p>
		}
		</div>
	)
}

export default DailySummary