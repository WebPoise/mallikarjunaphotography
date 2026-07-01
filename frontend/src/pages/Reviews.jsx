import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api';

const ReviewsPage = () => {
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState({
		author: '',
		rating: 0,
		text: '',
	});
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await API.get('/reviews');
				setReviews(response.data.reviews || []);
			} catch (error) {
				console.error('Error fetching reviews:', error);
			}
		};

		fetchReviews();
	}, []);

	const handleStarClick = (rating) => {
		setNewReview({ ...newReview, rating });
	};

	const handleAddReview = async (e) => {
		e.preventDefault();

		if (!newReview.author || !newReview.rating || !newReview.text) {
			setError('Please fill all fields and select a rating.');
			return;
		}

		try {
			const response = await API.post('/reviews', newReview);

			if (response.status === 200 || response.status === 201) {
				setReviews([...reviews, response.data]);
				setNewReview({ author: '', rating: 0, text: '' });
				setError('');
			}
		} catch (error) {
			console.error('Error submitting review:', error);
			setError('Could not submit your review. Please try again.');
		}
	};

	return (
		<section id="reviews" className="py-20 bg-gray-50 text-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-5xl font-extrabold text-gray-900 mb-4">
					Client Reviews
				</h2>

				<p className="text-lg text-gray-600 mb-10">
					Share your experience and read what our clients say about
					our photography services.
				</p>

				<form
					onSubmit={handleAddReview}
					className="max-w-lg mx-auto mb-12 bg-white p-8 rounded-2xl shadow-lg"
				>
					<h3 className="text-2xl font-bold mb-6 text-gray-800">
						Write a Review
					</h3>

					<div className="mb-4">
						<input
							type="text"
							placeholder="Your Name"
							value={newReview.author}
							onChange={(e) =>
								setNewReview({
									...newReview,
									author: e.target.value,
								})
							}
							className="w-full p-4 border border-gray-300 rounded-lg"
							required
						/>
					</div>

					<div className="mb-4">
						<textarea
							placeholder="Write your review"
							value={newReview.text}
							onChange={(e) =>
								setNewReview({
									...newReview,
									text: e.target.value,
								})
							}
							className="w-full p-4 border border-gray-300 rounded-lg"
							rows="5"
							required
						/>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 font-medium mb-2">
							Rating
						</label>

						<div className="flex justify-center space-x-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<FontAwesomeIcon
									key={star}
									icon={faStar}
									className={`cursor-pointer text-3xl ${
										star <= newReview.rating
											? 'text-yellow-500'
											: 'text-gray-300'
									}`}
									onClick={() => handleStarClick(star)}
								/>
							))}
						</div>
					</div>

					{error && <p className="text-red-500 mb-4">{error}</p>}

					<button
						type="submit"
						className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-pink-600 transition-all"
					>
						Submit Review
					</button>
				</form>

				<div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{reviews.map((review, index) => (
						<div
							key={index}
							className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
						>
							<h4 className="text-xl font-bold text-gray-800">
								{review.author}
							</h4>

							<div className="flex justify-center my-3">
								{[...Array(5)].map((_, i) => (
									<FontAwesomeIcon
										key={i}
										icon={faStar}
										className={
											i < review.rating
												? 'text-yellow-500'
												: 'text-gray-300'
										}
									/>
								))}
							</div>

							<p className="text-gray-700 leading-relaxed">
								{review.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ReviewsPage;