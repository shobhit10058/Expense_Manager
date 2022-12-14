import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

function Setting({ userDetails, setUserDetails, ...rest}) {
	const [form, setForm] = useState({ budget: userDetails.budget, categories: userDetails.categories, newCategory: "" });

	const handleBudgetUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/updateSetting`, { budget: form.budget });
			if (res.status === 200) {
				setUserDetails((userDetails) => { return { ...userDetails, amountLeft: form.budget, budget: form.budget } });
				alert('budget updated');
			}
		} catch (e) {
			alert('budget not updated');
		}
	}

	const handleAddCategory = (e) => {
		e.preventDefault();
		if (form.categories.includes(form.newCategory)) {
			alert("This category is already present");
			return;
		}
		setForm((form) => { return { ...form, categories: [...form.categories, form.newCategory], newCategory: "" } });
	}

	const handleRemoveCategory = (index) => {
		setForm((form) => {return {...form, categories: [...form.categories.slice(0, index), ...form.categories.slice(index + 1)]}})
	}

	const handleCategoryUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/updateSetting`, { categories: form.categories });
			if (res.status === 200) {
				setUserDetails((userDetails) => { return { ...userDetails, amountLeft: userDetails.budget, form: form.categories } });
				alert('categories updated');
			}
		} catch (e) {
			alert('categories not updated');
		}
	}

	return (
		<div className="container mt-5" style={{width: "500px"}}>
			<h1 className="display-2 text-center text-primary">Setting</h1>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Budget</Form.Label>
					<div className="container d-flex justify-content-space">
						<Form.Control type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
						<Button className="btn-danger ms-1" disabled={form.budget == userDetails.budget} onClick={handleBudgetUpdate}>Update</Button>
					</div>
					<Form.Text className="text-muted">
						Maximum amount that can be spent today
					</Form.Text>
				</Form.Group>
			</Form>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>New Category</Form.Label>
					<div className="container d-flex justify-content-space">
						<Form.Control type="string" placeholder="New Category" value={form.newCategory} onChange={(e) => setForm({ ...form, newCategory: e.target.value })} />
						<Button className="btn-danger ms-1" disabled={form.newCategory.length === 0} onClick={handleAddCategory}>Add</Button>
					</div><Form.Text className="text-muted">
						Add a new category of expense.
					</Form.Text>
				</Form.Group>
			</Form>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Categories</Form.Label>
					<div className="container d-flex justify-content-space flex-wrap">
						{
							form.categories.map((category, index) => {
								return (
									<span key={category} className='p-2 mt-2 bg-dark ms-3 text-white rounded-pill'>
										{category}
										<Button className="ms-1 btn-danger rounded-circle" onClick={() => handleRemoveCategory(index)}>X</Button>
									</span>
								)
							})
						}
					</div>
					<Button className="btn-danger mt-2" disabled={form.categories === userDetails.categories} onClick={handleCategoryUpdate}>Update Categories</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default Setting