import React, { useEffect, useState } from 'react';
import { API } from '../api';

const PricingManager = () => {
	const [pricing, setPricing] = useState([]);
	const [editingId, setEditingId] = useState(null);

	const [formData, setFormData] = useState({
		title: '',
		category: 'Wedding',
		packageType: 'Basic',
		price: '',
		description: '',
	});

	const fetchPricing = async () => {
		try {
			const response = await API.get('/pricing');
			setPricing(response.data.pricing || []);
		} catch (error) {
			console.error('Error fetching pricing:', error);
		}
	};

	useEffect(() => {
		fetchPricing();
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (editingId) {
				await API.patch(`/pricing/${editingId}`, formData);
				alert('Pricing updated successfully');
			} else {
				await API.post('/pricing', formData);
				alert('Pricing added successfully');
			}

			setFormData({
				title: '',
				category: 'Wedding',
				packageType: 'Basic',
				price: '',
				description: '',
			});
			setEditingId(null);
			fetchPricing();
		} catch (error) {
			console.error('Error saving pricing:', error);
			alert('Failed to save pricing');
		}
	};

	const handleEdit = (item) => {
		setEditingId(item._id);
		setFormData({
			title: item.title,
			category: item.category,
			packageType: item.packageType,
			price: item.price,
			description: item.description,
		});
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Delete this pricing package?')) return;

		try {
			await API.delete(`/pricing/${id}`);
			fetchPricing();
		} catch (error) {
			console.error('Error deleting pricing:', error);
			alert('Failed to delete pricing');
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
			>
				<h3 className="text-2xl font-bold">
					{editingId ? 'Edit Pricing Package' : 'Add Pricing Package'}
				</h3>

				<input
					type="text"
					name="title"
					placeholder="Package Title"
					value={formData.title}
					onChange={handleChange}
					required
					className="w-full p-3 border rounded"
				/>

				<select
					name="category"
					value={formData.category}
					onChange={handleChange}
					className="w-full p-3 border rounded"
				>
					<option>Wedding</option>
					<option>Maternity</option>
					<option>Baby Shoot</option>
					<option>Family</option>
					<option>Portrait</option>
					<option>Fine Art</option>
					<option>Event</option>
					<option>Custom</option>
				</select>

				<select
					name="packageType"
					value={formData.packageType}
					onChange={handleChange}
					className="w-full p-3 border rounded"
				>
					<option>Basic</option>
					<option>Medium</option>
					<option>Pro</option>
					<option>Custom</option>
				</select>

				<input
					type="text"
					name="price"
					placeholder="Price e.g. ₹25,000"
					value={formData.price}
					onChange={handleChange}
					required
					className="w-full p-3 border rounded"
				/>

				<textarea
					name="description"
					placeholder="Package Description"
					value={formData.description}
					onChange={handleChange}
					required
					rows="4"
					className="w-full p-3 border rounded"
				/>

				<button
					type="submit"
					className="bg-green-600 text-white px-6 py-3 rounded"
				>
					{editingId ? 'Update Package' : 'Add Package'}
				</button>

				{editingId && (
					<button
						type="button"
						onClick={() => {
							setEditingId(null);
							setFormData({
								title: '',
								category: 'Wedding',
								packageType: 'Basic',
								price: '',
								description: '',
							});
						}}
						className="ml-4 bg-gray-500 text-white px-6 py-3 rounded"
					>
						Cancel
					</button>
				)}
			</form>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{pricing.map((item) => (
					<div
						key={item._id}
						className="bg-white p-6 rounded-lg shadow"
					>
						<h3 className="text-xl font-bold">{item.title}</h3>
						<p>
							<strong>Category:</strong> {item.category}
						</p>
						<p>
							<strong>Package:</strong> {item.packageType}
						</p>
						<p>
							<strong>Price:</strong> {item.price}
						</p>
						<p className="my-3">{item.description}</p>

						<button
							onClick={() => handleEdit(item)}
							className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
						>
							Edit
						</button>

						<button
							onClick={() => handleDelete(item._id)}
							className="bg-red-600 text-white px-4 py-2 rounded"
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default PricingManager;