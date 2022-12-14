import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";

function PastYearSummary() {

	const [pastYearData, setPastYearData] = useState(null);
	const getPastYearExpense = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense/summaryUpto?days=366`);
			if (res.status === 200) {
				let data = res.data.data;
				if (data.length > 0) {
					let amountData = [['day', 'spent']];
					let currAm = data[0].amount;
					let currDate = new Date(data[0].date);
					currDate = currDate.toDateString();

					for (let index = 1; index < data.length; index += 1) {
						let date = new Date(data[index].date)
						date = date.toDateString();
						if (currDate === date) {
							currAm += data[index].amount;
						} else {
							amountData.push([amountData.length, currAm]);
							currDate = date;
							currAm = data[index].amount;
						}
					}
					amountData.push([amountData.length, currAm]);
					setPastYearData(amountData);
				}
			}
		} catch (e) {
			
		}
	}

	useEffect(() => {
		getPastYearExpense();
	}, [])

	return (
		<div className='container d-flex flex-column justify-content-center align-items-center'>
			<h1 className='text-center text-primary display-5 mt-3 mb-4'>Summary Over Past Year</h1>

			{pastYearData ? (<Chart
				chartType="Line"
				width="100%"
				height="400px"
				data={pastYearData}
			/>) : <p className='text-center mt-3 fs-4'>No Data to show!</p>
			}
		</div>
	)
}

export default PastYearSummary