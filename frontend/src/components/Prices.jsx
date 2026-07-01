import React, { useEffect, useState } from 'react';
import { API } from '../api';

const Prices = () => {
	const [pricing, setPricing] = useState([]);
	const [loading, setLoading] = useState(true);

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
		return `₹${Number(cleanPrice).toLocaleString('en-IN')}`;
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{pricing.map((item) => (
							<div
								key={item._id}
								className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
							>
								<div className="mb-4">
									<span className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-1 rounded-full">
										{item.category}
									</span>

									<span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full ml-2">
										{item.packageType}
									</span>
								</div>

								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									{item.title}
								</h3>

								<p className="text-gray-600 leading-relaxed mb-6 min-h-[80px]">
									{item.description}
								</p>

								<div className="border-t pt-6">
									<p className="text-sm text-gray-500 mb-1">
										Starting From
									</p>

									<p className="text-4xl font-extrabold text-green-600">
										{formatPrice(item.price)}
									</p>
								</div>

								<a
									href="#book"
									className="mt-6 inline-block w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-all"
								>
									Book Now
								</a>
							</div>
						))}
					</div>
				)}

				<div className="mt-16 bg-white rounded-2xl shadow-md p-8 text-left text-gray-600">
					<p className="mb-4">
						We capture memories that last forever. Whether it is a
						wedding, maternity shoot, newborn session, family
						photography, or portraits, we focus on creating
						beautiful and natural images.
					</p>

					<p>
						Final edited photographs are usually delivered within
						2–3 weeks. Travel charges may apply for locations
						outside the city. A booking advance may be required to
						confirm your session.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Prices;