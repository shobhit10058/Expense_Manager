import React, { useState, useEffect} from 'react'
import DailySummary from './DailySummary'
import PastYearSummary from './PastYearSummary'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Summary() {
	const [key, setKey] = useState('dailySummary');

	return (
		<div>
			 <Tabs
			 	activeKey={key}
      			onSelect={(k) => setKey(k)}
				className="mb-3"
				>
				<Tab eventKey="dailySummary" title="Daily Summary">
					<DailySummary />
				</Tab>
				<Tab eventKey="pastYearSummary" title="Yearly Summary">
					<PastYearSummary />
				</Tab>
			</Tabs>
		</div>
	)
}

export default Summary