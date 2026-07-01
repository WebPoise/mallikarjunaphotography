import React, { useState } from 'react';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [successMessage, setSuccessMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setSuccessMessage(
			'Thank you for contacting us. Please contact us by phone or email.',
		);

		setFormData({
			name: '',
			email: '',
			message: '',
		});
	};

	return (
		<section id="kontakt" className="py-20 bg-white text-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-8">
					Contact
				</h2>

				<p className="text-lg text-gray-600 mb-4">
					Have any questions? Feel free to contact us.
				</p>

				<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
					<div className="mb-4">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg"
						/>
					</div>

					<div className="mb-4">
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg"
						/>
					</div>

					<div className="mb-4">
						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg"
							rows="5"
						/>
					</div>

					<button className="px-6 py-3 bg-lollipop text-white font-semibold rounded-lg">
						Send Message
					</button>
				</form>

				{successMessage && (
					<p className="mt-4 text-lg text-green-500">
						{successMessage}
					</p>
				)}
			</div>
		</section>
	);
};

export default Contact;