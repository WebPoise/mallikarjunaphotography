import multer from 'multer';
import sharp from 'sharp';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
	'video/mp4',
	'video/quicktime',
	'video/webm',
];

const fileFilter = (req, file, cb) => {
	if (allowedTypes.includes(file.mimetype)) cb(null, true);
	else cb(new Error('Only JPG, PNG, GIF, WebP, MP4, MOV, and WebM are allowed.'), false);
};

const memoryUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter,
	limits: { fileSize: 200 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, folder, resourceType = 'image') => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				folder,
				resource_type: resourceType,
				...(resourceType === 'image' ? { format: 'jpg' } : {}),
			},
			(error, result) => {
				if (error) reject(error);
				else resolve(result);
			},
		);

		streamifier.createReadStream(buffer).pipe(stream);
	});
};

const upload = {
	single: (fieldName) => [
		memoryUpload.single(fieldName),

		async (req, res, next) => {
			try {
				if (!req.file) return next();

				const folder = `dsphoto/${req.body.category || 'uncategorized'}`;
				let buffer = req.file.buffer;
				let resourceType = 'image';

				if (req.file.mimetype.startsWith('image/')) {
					buffer = await sharp(req.file.buffer)
						.resize({ width: 2000, withoutEnlargement: true })
						.jpeg({ quality: 80, progressive: true })
						.toBuffer();

					resourceType = 'image';
				}

				if (req.file.mimetype.startsWith('video/')) {
					resourceType = 'video';
				}

				const result = await uploadToCloudinary(buffer, folder, resourceType);

				req.file.path = result.secure_url;
				req.file.filename = result.public_id;
				req.file.size = buffer.length;
				req.file.resourceType = resourceType;

				next();
			} catch (error) {
				next(error);
			}
		},
	],
};

export default upload;