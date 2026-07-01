import Pricing from '../models/pricingModel.js';

export const createPricing = async (req, res) => {
	try {
		const pricing = await Pricing.create(req.body);

		res.status(201).json({
			success: true,
			message: 'Pricing package created successfully',
			pricing,
		});
	} catch (error) {
		console.error('Error creating pricing:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const getPricing = async (req, res) => {
	try {
		const pricing = await Pricing.find({ isActive: true }).sort({
			createdAt: -1,
		});

		res.status(200).json({
			success: true,
			pricing,
		});
	} catch (error) {
		console.error('Error fetching pricing:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updatePricing = async (req, res) => {
	try {
		const pricing = await Pricing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);

		if (!pricing) {
			return res.status(404).json({
				success: false,
				message: 'Pricing package not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Pricing package updated successfully',
			pricing,
		});
	} catch (error) {
		console.error('Error updating pricing:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const deletePricing = async (req, res) => {
	try {
		const pricing = await Pricing.findByIdAndDelete(req.params.id);

		if (!pricing) {
			return res.status(404).json({
				success: false,
				message: 'Pricing package not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Pricing package deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting pricing:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};