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
			console.error('Error submitting booking:', error);
			setStatus('Failed to submit booking request.');
		}
	};

	return (
		<div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-16">
			<h2 className="text-3xl font-bold mb-6 text-center">
				Book a Photography Session
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					placeholder="Full Name"
					className="w-full p-3 border border-gray-300 rounded-lg"
				/>

				<input
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
					placeholder="Phone Number"
					className="w-full p-3 border border-gray-300 rounded-lg"
				/>

				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
					className="w-full p-3 border border-gray-300 rounded-lg"
				/>

				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Tell us about your photography requirements..."
					className="w-full p-3 border border-gray-300 rounded-lg"
					rows="4"
				/>

				<button
					type="submit"
					className="w-full bg-lollipop text-white py-3 rounded-lg hover:bg-earthyBrown transition-all"
				>
					Send Booking Request
				</button>

				{status && (
					<p className="mt-4 text-center text-green-600 font-medium">
						{status}
					</p>
				)}
			</form>
		</div>
	);
};

export default BookTime;