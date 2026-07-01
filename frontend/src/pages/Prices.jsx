import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

const Prices = () => {
	const [pricing, setPricing] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPricing = async () => {
			try {
				const response = await API.get('/pricing');
				setPricing(response.data.pricing || []);
			} catch (error) {
				console.error('Error fetching pricing:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPricing();
	}, []);

	const formatPrice = (price) => {
		if (!price) return '₹0';

		const cleanPrice = String(price).replace(/[₹,\s]/g, '');
		const numberPrice = Number(cleanPrice);

		if (Number.isNaN(numberPrice)) {
			return price.includes('₹') ? price : `₹${price}`;
		}

		return `₹${numberPrice.toLocaleString('en-IN')}`;
	};

	const formatDescription = (description) => {
		if (!description) return [];

		return description
			.replace(/(\d+\.)/g, '\n$1')
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);
	};

	const handleBookNow = () => {
		navigate('/book');
	};

	return (
		<section id="prices" className="py-20 bg-gray-50 text-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-5xl font-extrabold text-gray-900 mb-4">
					Pricing Packages
				</h2>

				<p className="text-lg text-gray-600 mb-12">
					Choose the perfect photography package for your special
					moments.
				</p>

				{loading ? (
					<p className="text-gray-600">Loading pricing...</p>
				) : pricing.length === 0 ? (
					<p className="text-gray-600">
						No pricing packages available.
					</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
						{pricing.map((item) => {
							const descriptionPoints = formatDescription(
								item.description,
							);

							return (
								<div
									key={item._id}
									className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left flex flex-col min-h-[620px]"
								>
									<div className="mb-5">
										<span className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-1 rounded-full mb-2">
											{item.category}
										</span>

										<span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full ml-2 mb-2">
											{item.packageType}
										</span>
									</div>

									<h3 className="text-2xl font-bold text-gray-900 mb-5 text-center">
										{item.title}
									</h3>

									<ul className="space-y-3 text-gray-600 mb-8 flex-grow">
										{descriptionPoints.map((point, index) => (
											<li
												key={index}
												className="flex items-start gap-3"
											>
												<span className="mt-1 text-green-600 font-bold">
													✓
												</span>
												<span>{point}</span>
											</li>
										))}
									</ul>

									<div className="border-t pt-6 text-center mt-auto">
										<p className="text-sm text-gray-500 mb-1">
											Starting From
										</p>

										<p className="text-4xl font-extrabold text-green-600">
											{formatPrice(item.price)}
										</p>
									</div>

									<button
										type="button"
										onClick={handleBookNow}
										className="mt-6 inline-block w-full bg-gray-900 text-white text-center py-3 rounded-xl font-semibold hover:bg-pink-600 transition-all"
									>
										Book Now
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default Prices;