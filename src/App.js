import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import axios from 'axios';

function App() {
	const [history, setHistory] = useState([]);
	const [timers, setTimers] = useState([]);

	useEffect(() => {
		axios
			.get('/api/log')
			.then((res) => {
				setHistory(res.data);
			})
			.catch((err) => console.error('Error fetching history', err));
	}, []);

	const breakfastProducts = [
		'Breakfast Filets',
		'Spicy Breakfast Filets',
		'Grilled Breakfast Filets',
		'Eggs',
		'Hash Browns',
		'Other',
	];

	const lunchProducts = [
		'Filets',
		'Spicys',
		'Strips',
		'Nuggets',
		'Grilled Filets',
		'Grilled Nuggets',
		'Fries',
		'Other',
	];

	const handleButtonClick = (product) => {
		const currentTime = new Date();
		let newEntry;

		if (timers[product]) {
			// If timer is running, stop it and log as 'back in stock'
			newEntry = {
				item: product,
				status: 'back in stock',
				timestamp: currentTime,
			};
			setTimers((timers) => ({ ...timers, [product]: null }));
		} else {
			// If timer isn't running, start it and log as 'holding'
			newEntry = {
				item: product,
				status: 'holding',
				timestamp: currentTime,
			};
			setTimers((timers) => ({ ...timers, [product]: currentTime }));
		}

		axios
			.post('/api/log', newEntry)
			.then(() => {
				setHistory((prevHistory) => [...prevHistory, newEntry]);
			})
			.catch((error) => console.error('Error posting log:', error));
	};

	const handleReset = () => {
		axios
			.delete('/api/log')
			.then(() => {
				setHistory([]);
				setTimers({});
			})
			.catch((error) => console.error('Error resetting history:', error));
	};

	//Format timestamps for readability
	const formatTimestamp = (timestamp) => {
		return new Date(timestamp).toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true,
		});
	};

	return (
		<div className='container mx-auto p-4 flex'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* Breakfast Buttons */}
				<div className='space-y-4'>
					<h2 className='text-lg font-bold mb-4'>Breakfast</h2>
					{breakfastProducts.map((product) => (
						<Button
							key={product}
							label={product}
							onClick={() => handleButtonClick(product)}
							className={`py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
								timers[product]
									? 'bg-red-500 text-white focus:ring-red-400'
									: 'bg-green-500 text-white focus:ring-green-400'
							}`}
						/>
					))}
				</div>
				{/* Lunch Buttons */}
				<div className='space-y-4'>
					<h2 className='text-lg font-bold mb-4'>Lunch</h2>
					{lunchProducts.map((product) => (
						<Button
							key={product}
							label={product}
							onClick={() => handleButtonClick(product)}
							className={`py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
								timers[product]
									? 'bg-red-500 text-white focus:ring-red-400'
									: 'bg-green-500 text-white focus:ring-green-400'
							}`} // Conditional Tailwind classes
						/>
					))}
				</div>

				{/* History Log Table */}
				<div className='mt-8'>
					<h2 className='text-lg font-bold mb-4 text-center'>History Log</h2>
					<div className='overflow-x-auto'>
						<table className='min-w-full table-auto'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Item</th>
									<th className='px-4 py-2'>Status</th>
									<th className='px-4 py-2'>Timestamp</th>
								</tr>
							</thead>
							<tbody>
								{[...history].reverse().map((entry, index) => (
									<tr key={index}>
										<td className='border px-4 py-2'>{entry.item}</td>
										<td className='border px-4 py-2'>{entry.status}</td>
										<td className='border px-4 py-2'>
											{formatTimestamp(entry.timestamp)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{history.length > 0 && (
						<button
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
							onClick={handleReset}
						>
							Reset History
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
