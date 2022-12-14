import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function AppNav() {
	const pages = ["setting", "expense", "summary", "logout"]
	const [active, setActive] = useState(0);
	
	return (
		<nav className="navbar navbar-expand-lg bg-dark">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{
							pages.map((page, index) => {
								return (
									<li className={`nav-item ${index===active?"bg-primary rounded":""}`} key={page}>
										<Link className={`nav-link active text-white text-capitalize`} to={`/${page}`} onClick={() => setActive(index)}>{page}</Link>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default AppNav