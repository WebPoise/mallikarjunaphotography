import React, { useState, useEffect, memo } from 'react';
import ImageOptimizer from './ImageOptimizer';

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

const MediaItem = ({
	media,
	className,
	priority = false,
	controls = false,
	autoPlay = false,
	showOverlay = true,
}) => {
	if (isVideo(media.url)) {
		return (
			<div className="relative w-full h-full flex items-center justify-center bg-gray-100">
				<video
					src={media.url}
					className={className}
					controls={controls}
					autoPlay={autoPlay}
					muted
					loop={autoPlay}
					playsInline
					preload="metadata"
				/>
				{showOverlay && !controls && <PlayOverlay />}
			</div>
		);
	}

	return (
		<ImageOptimizer
			src={media.url}
			alt={media.title || 'Gallery media'}
			className={className}
			priority={priority}
		/>
	);
};

const Carousel = memo(({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImageIndex, setModalImageIndex] = useState(null);

	useEffect(() => {
		if (!images || images.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [images]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	};

	const openModal = (index) => {
		setModalImageIndex(index);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalImageIndex(null);
	};

	const nextModalImage = (e) => {
		e.stopPropagation();
		setModalImageIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevModalImage = (e) => {
		e.stopPropagation();
		setModalImageIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	};

	useEffect(() => {
		if (!images || images.length <= 1) return;

		for (let i = 1; i <= 2; i++) {
			const nextIndex = (currentIndex + i) % images.length;
			const nextUrl = images[nextIndex]?.url;

			if (nextUrl && !isVideo(nextUrl)) {
				const img = new Image();
				img.src = nextUrl;
			}
		}
	}, [currentIndex, images]);

	if (!images || images.length === 0) return null;

	return (
		<div>
			{isModalOpen && modalImageIndex !== null && (
				<div
					className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
					onClick={closeModal}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className="max-w-[95vw] max-h-[90vh]"
					>
						<MediaItem
							media={images[modalImageIndex]}
							className="w-auto max-w-full h-auto max-h-[85vh] object-contain rounded-lg"
							controls={isVideo(images[modalImageIndex]?.url)}
							autoPlay={isVideo(images[modalImageIndex]?.url)}
							showOverlay={false}
						/>
					</div>

					<button
						onClick={prevModalImage}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-3 rounded-full"
					>
						←
					</button>

					<button
						onClick={nextModalImage}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black p-3 rounded-full"
					>
						→
					</button>
				</div>
			)}

			<div className="relative w-full h-[320px] sm:h-[430px] md:h-[620px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
				{images.map((image, index) => (
					<div
						key={image.id || index}
						className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
							index === currentIndex
								? 'opacity-100 z-10'
								: 'opacity-0 z-0'
						}`}
						onClick={() => openModal(index)}
					>
						<MediaItem
							media={image}
							className="w-full h-full object-contain bg-gray-100 rounded-lg"
							priority={index === 0}
							autoPlay={false}
							showOverlay={isVideo(image.url)}
						/>
					</div>
				))}

				<button
					onClick={prevSlide}
					className="absolute z-20 top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3 shadow"
				>
					←
				</button>

				<button
					onClick={nextSlide}
					className="absolute z-20 top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3 shadow"
				>
					→
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
				{images.map((image, index) => (
					<div
						key={image.id || index}
						className="w-full h-64 cursor-pointer bg-gray-100 rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
						onClick={() => openModal(index)}
					>
						<MediaItem
							media={image}
							className="w-full h-full object-contain rounded-lg bg-gray-100"
							priority={index < 3 && currentIndex === 0}
							showOverlay={isVideo(image.url)}
						/>
					</div>
				))}
			</div>
		</div>
	);
});

export default Carousel;