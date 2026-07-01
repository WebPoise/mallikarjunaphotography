import React, { useEffect } from 'react';
import ImageOptimizer from './ImageOptimizer';

const isVideo = (url = '') => {
	return (
		url.includes('/video/upload/') ||
		url.endsWith('.mp4') ||
		url.endsWith('.mov') ||
		url.endsWith('.webm')
	);
};

const ImageModal = ({ image, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
			onClick={onClose}
		>
			<div
				className="relative max-w-4xl max-h-[90vh] mx-auto p-4"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="absolute top-0 right-0 -mt-10 -mr-4 text-white text-2xl font-bold z-50"
					onClick={onClose}
				>
					×
				</button>

				<div className="bg-white rounded-lg overflow-hidden shadow-2xl max-h-[80vh]">
					<div className="relative p-2 flex justify-center">
						{isVideo(image.url) ? (
							<video
								src={image.url}
								controls
								autoPlay
								playsInline
								className="max-h-[70vh] w-auto mx-auto object-contain"
							/>
						) : (
							<ImageOptimizer
								src={image.url}
								alt={image.title || 'Gallery image'}
								className="max-h-[70vh] w-auto mx-auto object-contain"
								priority={true}
							/>
						)}
					</div>

					{image.title && (
						<div className="p-4 bg-white">
							<h3 className="text-xl font-semibold">
								{image.title}
							</h3>
							{image.description && (
								<p className="text-gray-600 mt-2">
									{image.description}
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImageModal;