import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

const createAdmin = async () => {
	try {
		const adminEmail = 'abhias1947@gmail.com';

		const existingAdmin = await User.findOne({ email: adminEmail });

		if (existingAdmin) {
			existingAdmin.name = 'Abhishek R';
			existingAdmin.password = 'Abhishek@1234';
			existingAdmin.isAdmin = true;

			await existingAdmin.save();
			console.log('Admin updated successfully');
		} else {
			const newAdmin = new User({
				name: 'Abhishek R',
				email: adminEmail,
				password: 'Abhishek@1234',
				isAdmin: true,
			});

			await newAdmin.save();
			console.log('Admin created successfully');
		}

		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
};

createAdmin();