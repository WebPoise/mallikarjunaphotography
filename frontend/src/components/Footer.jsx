import React from 'react';

const Footer = () => {
return ( <footer className="bg-gray-900 text-white py-6"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div className="flex flex-col items-center"> <p className="text-center">
© {new Date().getFullYear()} MalliKarjuna Photogarphy. All rights reserved. </p>


				<div className="mt-4 flex flex-wrap justify-center gap-6">
					<a
						href="https://www.instagram.com/mallikarjuna_gowds_mmg?igsh=YXphdWc0bnMxcnNi"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-pink-400 transition-colors"
					>
						Instagram
					</a>

					<a
						href="https://facebook.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-400 transition-colors"
					>
						Facebook
					</a>

					<a
						href="https://wa.me/917975295996"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-green-400 transition-colors"
					>
						WhatsApp
					</a>

					<a
						href="mailto:info@yourstudio.com"
						className="hover:text-yellow-400 transition-colors"
					>
						Email
					</a>
				</div>

				<p className="mt-4 text-sm text-gray-400 text-center">
					Capturing timeless moments, creating memories that last forever.
				</p>

				<p className="mt-3 text-sm text-gray-500 text-center">
					Developed by{' '}
					<a
						href="https://www.webpoise.in"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 hover:text-blue-300 underline"
					>
						WebPoise
					</a>
				</p>
			</div>
		</div>
	</footer>
);

};

export default Footer;
