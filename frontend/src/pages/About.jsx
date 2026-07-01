import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const AboutPage = () => {
	return (
		<section id="about" className="py-20 bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
				
				{/* Photographer Image */}
				<div className="md:w-1/2 mb-8 md:mb-0">
					<img
	src="/Malli.jpeg"
	alt="Photographer"
	className="w-full h-auto rounded-lg shadow-lg"
/>
				</div>

				{/* About Content */}
				<div className="md:w-1/2 md:pl-12">
					<h2 className="text-4xl font-bold text-gray-800 mb-6">
						About Us
					</h2>

					<p className="text-lg text-gray-600 mb-6">
						Welcome to our photography studio!
						<br /><br />

						We are passionate about capturing life's most beautiful
						moments through creative and professional photography.
						Whether it's weddings, engagements, family portraits,
						maternity shoots, birthdays, events, fashion, wildlife,
						or commercial photography, we focus on preserving every
						special memory with perfection.
						<br /><br />

						Our goal is not just to take photographs, but to tell
						stories through images that reflect emotions,
						personality, and unforgettable experiences.
						<br /><br />

						Every client is unique, and every photoshoot is
						carefully planned to create images that remain timeless
						for years to come. We work closely with our clients to
						understand their vision and deliver photographs they
						will cherish forever.
						<br /><br />

						Let us help you turn your special moments into lasting
						memories.
					</p>

					{/* Social Links */}
					<div className="flex space-x-6 mt-4">
						<a
							href="https://instagram.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 hover:text-pink-600"
						>
							<FontAwesomeIcon icon={faInstagram} size="2x" />
						</a>

						<a
							href="https://facebook.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-500 hover:text-blue-600"
						>
							<FontAwesomeIcon icon={faFacebook} size="2x" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutPage;