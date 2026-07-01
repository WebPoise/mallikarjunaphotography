import Image from '../models/imageModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCloudinaryPublicId = (url) => {
	const parts = url.split('/upload/');
	if (parts.length < 2) return null;

	const pathWithVersion = parts[1];
	const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, '');

	return pathWithoutVersion.replace(/\.[^/.]+$/, '');
};

export const getImages = async (req, res) => {
	try {
		const category = req.query.category;
		const filter = category ? { category } : {};

		const images = await Image.find(filter).sort({ order: 1 });

		const imageUrls = images.map((image) => ({
			id: image._id,
			url: image.imageUrl,
			category: image.category,
			title: image.title,
			description: image.description,
			order: image.order,
			mediaType: image.imageUrl.includes('/video/upload/')
				? 'video'
				: 'image',
		}));

		res.status(200).json(imageUrls);
	} catch (error) {
		console.error('Error fetching images:', error);
		res.status(500).json({
			message: 'Error fetching images',
			error: error.message,
			mongoState: mongoose.connection.readyState,
		});
	}
};

export const uploadImage = async (req, res) => {
	try {
		const { title = 'Untitled', description = '', category } = req.body;

		if (!category) {
			return res.status(400).json({
				message: 'Category is required',
			});
		}

		if (!req.file || !req.file.path) {
			return res.status(400).json({
				message: 'Media file is required',
			});
		}

		const imageCount = await Image.countDocuments({ category });

		const newImage = new Image({
			title,
			description,
			imageUrl: req.file.path,
			category,
			order: imageCount,
		});

		const savedImage = await newImage.save();

		res.json(savedImage);
	} catch (error) {
		console.error('Error uploading media:', error);
		res.status(500).json({
			message: 'Error uploading media',
			error: error.message,
		});
	}
};

export const reorderImages = async (req, res) => {
	const { images } = req.body;

	try {
		await Promise.all(
			images.map((imageId, index) => {
				if (imageId) {
					return Image.findByIdAndUpdate(imageId, { order: index });
				}
				return Promise.resolve();
			}),
		);

		res.status(200).json({ message: 'Order updated successfully' });
	} catch (error) {
		console.error('Error updating image order:', error);
		res.status(500).json({ message: 'Error updating order' });
	}
};

export const getCategories = async (req, res) => {
	try {
		const categories = await Image.distinct('category');
		res.status(200).json({ categories });
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({ message: 'Error fetching categories' });
	}
};

export const deleteImage = async (req, res) => {
	const { id } = req.params;

	try {
		const image = await Image.findById(id);

		if (!image) {
			return res.status(404).json({ message: 'Media not found' });
		}

		const publicId = getCloudinaryPublicId(image.imageUrl);

		if (publicId) {
			const resourceType = image.imageUrl.includes('/video/upload/')
				? 'video'
				: 'image';

			const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
				resource_type: resourceType,
			});

			console.log('Cloudinary delete result:', cloudinaryResult);
		}

		await Image.findByIdAndDelete(id);

		res.status(200).json({ message: 'Media deleted successfully' });
	} catch (error) {
		console.error('Error deleting media:', error);
		res.status(500).json({
			message: 'Error deleting media',
			error: error.message,
		});
	}
};

export default {
	getImages,
	uploadImage,
	reorderImages,
	getCategories,
	deleteImage,
};