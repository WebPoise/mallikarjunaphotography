import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		packageType: {
			type: String,
			enum: ['Basic', 'Medium', 'Pro', 'Custom'],
			default: 'Basic',
		},
		price: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;