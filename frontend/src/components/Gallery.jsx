import React, { useState, lazy, Suspense } from 'react';
import ImageOptimizer from './ImageOptimizer';
import LoadingSpinner from './LoadingSpinner';

const LazyImageModal = lazy(() => import('./ImageModal'));

const isVideo = (url = '') => {
	return (
		url.includes('/video/upload/') ||
		url.endsWith('.mp4') ||
		url.endsWith('.mov') ||
		url.endsWith('.webm')
	);
};

const PlayOverlay = () => (
	<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 pointer-events-none">
		<div className="w-16 h-16 rounded-full bg-black bg-opacity-70 text-white flex items-center justify-center text-3xl shadow-lg">
			▶
		</div>
	</div>
);

const Gallery = ({ images, categoryFilter }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const filteredImages = categoryFilter
		? images.filter((image) => image.category === categoryFilter)
		: images;

	const handleImageClick = (image) => {
		setSelectedImage(image);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedImage(null);
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{filteredImages.map((image, index) => (
					<div
						key={image.id || index}
						className="cursor-pointer overflow-hidden rounded-lg shadow-md h-64"
						onClick={() => handleImageClick(image)}
					>
						{isVideo(image.url) ? (
							<div className="relative w-full h-full">
								<video
									src={image.url}
									muted
									playsInline
									preload="metadata"
									className="w-full h-full object-contain bg-gray-100 transition-transform duration-300 hover:scale-105"
								/>
								<PlayOverlay />
							</div>
						) : (
							<ImageOptimizer
								src={image.url}
								alt={image.title || 'Gallery image'}
								className="w-full h-full object-contain bg-gray-100 transition-transform duration-300 hover:scale-105"
								priority={index < 4}
							/>
						)}
					</div>
				))}
			</div>

			{modalOpen && selectedImage && (
				<Suspense fallback={<LoadingSpinner />}>
					<LazyImageModal
						image={selectedImage}
						onClose={closeModal}
					/>
				</Suspense>
			)}
		</>
	);
};

export default Gallery;