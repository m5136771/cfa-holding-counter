import React, { useState } from 'react';
import Button from './components/Button';
import handleClick from './components/handleClick';

function App() {
	const [history, setHistory] = useState([]);

	const products = [
		'Filets',
		'Spicys',
		'Strips',
		'Nuggets',
		'Grilled Filets',
		'Grilled Nuggets',
	];

	const handleReset = () => {
		setHistory([]);
	};

	return (
		<div className='container mx-auto p-4'>
			<div className='flex flex-col items-center space-y-4'>
				{products.map((product) => (
					<Button
						key={product}
						label={product}
						onClick={() => handleClick(product, setHistory)}
					/>
				))}
			</div>

			{/* History Log Table */}
			<div className='mt-8'>
				<h2 className='text-lg font-bold mb-4'>History Log</h2>
				<table className='min-w-full table-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2'>Date</th>
							<th className='px-4 py-2'>Time</th>
							<th className='px-4 py-2'>Product</th>
						</tr>
					</thead>
					<tbody>
						{history.map((entry, index) => (
							<tr key={index}>
								<td className='border px-4 py-2'>{entry.date}</td>
								<td className='border px-4 py-2'>{entry.time}</td>
								<td className='border px-4 py-2'>{entry.product}</td>
							</tr>
						))}
					</tbody>
				</table>
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
	);
}

export default App;
