import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faInstagram,
	faFacebook,
	faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
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

		const whatsappMessage = `Hello, my name is ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
		const whatsappUrl = `https://wa.me/917975295996?text=${encodeURIComponent(
			whatsappMessage,
		)}`;

		window.open(whatsappUrl, '_blank');

		setSuccessMessage('Thank you! WhatsApp chat has been opened.');

		setFormData({
			name: '',
			phone: '',
			message: '',
		});
	};

	return (
		<section id="contact" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-5xl font-extrabold text-gray-900 mb-4">
						Contact Us
					</h2>

					<p className="text-lg text-gray-600">
						Have questions or want to book a photoshoot? Get in
						touch with us.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					<div className="bg-white rounded-2xl shadow-lg p-8 text-left">
						<h3 className="text-2xl font-bold text-gray-900 mb-6">
							Get in Touch
						</h3>

						<div className="space-y-5 text-gray-700">
							<p className="flex items-center gap-3">
								<FontAwesomeIcon
									icon={faPhone}
									className="text-pink-600"
								/>
								<a
									href="tel:+917975295996"
									className="hover:text-pink-600"
								>
									+91 7975295996
								</a>
							</p>

							<p className="flex items-center gap-3">
								<FontAwesomeIcon
									icon={faWhatsapp}
									className="text-green-600"
								/>
								<a
									href="https://wa.me/917975295996"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-green-600"
								>
									Chat on WhatsApp
								</a>
							</p>

							<p className="flex items-center gap-3">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-blue-600"
								/>
								<a
									href="mailto:yourstudio@gmail.com"
									className="hover:text-blue-600"
								>
									yourstudio@gmail.com
								</a>
							</p>

							<p className="flex items-center gap-3">
								<FontAwesomeIcon
									icon={faLocationDot}
									className="text-red-600"
								/>
								<span>Bellary, Karnataka, India</span>
							</p>
						</div>

						<div className="flex space-x-5 mt-8">
							<a
								href="https://www.instagram.com/mallikarjuna_gowds_mmg?igsh=YXphdWc0bnMxcnNi"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-pink-600 text-2xl"
								aria-label="Follow us on Instagram"
							>
								<FontAwesomeIcon icon={faInstagram} />
							</a>

							<a
								href="https://www.facebook.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-blue-600 text-2xl"
								aria-label="Follow us on Facebook"
							>
								<FontAwesomeIcon icon={faFacebook} />
							</a>

							<a
								href="https://wa.me/917975295996"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-green-600 text-2xl"
								aria-label="Chat with us on WhatsApp"
							>
								<FontAwesomeIcon icon={faWhatsapp} />
							</a>
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="bg-white rounded-2xl shadow-lg p-8"
					>
						<h3 className="text-2xl font-bold text-gray-900 mb-6">
							Send a Message
						</h3>

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
								type="tel"
								name="phone"
								placeholder="Your Phone Number"
								value={formData.phone}
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

						<button className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-pink-600 transition-all">
							Send on WhatsApp
						</button>

						{successMessage && (
							<p className="mt-4 text-lg text-green-600 text-center">
								{successMessage}
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;