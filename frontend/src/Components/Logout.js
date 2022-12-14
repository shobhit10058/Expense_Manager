import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.removeItem("token");
		navigate("/login");
	}, [])
	
	return (
		<div className='container text-center mt-5'> <h1 className='display-1'>Logging out ...</h1></div>
	)
}

export default Logout