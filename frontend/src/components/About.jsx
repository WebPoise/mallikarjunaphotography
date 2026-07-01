import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const About = () => {
	return (
		<section id="about" className="py-20 bg-gray-100 text-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-8">
					About Me
				</h2>

				<p className="text-lg text-gray-600 max-w-4xl mx-auto">
					I am a passionate professional photographer dedicated to
					capturing life's most meaningful moments. Whether it's a
					wedding, portrait session, maternity shoot, family event, or
					special celebration, my goal is to create timeless images
					that tell your unique story and preserve memories for years
					to come.
				</p>

				<p className="text-lg text-gray-600 max-w-4xl mx-auto mt-6">
					With a creative eye for detail and a commitment to quality,
					I strive to deliver photographs that reflect genuine
					emotions, beautiful moments, and unforgettable experiences.
				</p>

				<div className="flex justify-center space-x-6 mt-8">
					<a
						href="https://www.instagram.com/mallikarjuna_gowds_mmg?igsh=YXphdWc0bnMxcnNi"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 hover:text-pink-600"
						aria-label="Instagram"
					>
						<FontAwesomeIcon icon={faInstagram} size="2x" />
					</a>

					<a
						href="https://www.facebook.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 hover:text-blue-600"
						aria-label="Facebook"
					>
						<FontAwesomeIcon icon={faFacebook} size="2x" />
					</a>
				</div>
			</div>
		</section>
	);
};

export default About;