import React, { useState } from 'react';
import { API } from '../api';

const BookTime = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [date, setDate] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('Submitting booking...');

		try {
			const response = await API.post('/bookings', {
				name,
				phone,
				date,
				message,
			});

			if (response.status === 200 || response.status === 201) {
				setStatus('Booking request submitted successfully!');

				setName('');
				setPhone('');
				setDate('');
				setMessage('');
			}
		} catch (error) {
			console.error('Error saving booking:', error);
			setStatus('Failed to submit booking request.');
		}
	};

	return (
		<div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6">Book a Session</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Date
					</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Message
					</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-lg"
						rows="4"
					></textarea>
				</div>

				<button
					type="submit"
					className="w-full bg-lollipop text-white py-3 rounded-lg hover:bg-earthyBrown transition-all"
				>
					Submit Booking
				</button>

				{status && <p className="mt-4 text-green-500">{status}</p>}
			</form>
		</div>
	);
};

export default BookTime;