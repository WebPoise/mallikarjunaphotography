import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import GallerySections from '../components/GallerySections';
import { Helmet } from 'react-helmet-async';

const Home = () => {
	return (
		<div className="bg-neutralGray text-earthyBrown">
			<Helmet>
				<title>MalliKarjuna Photography Studio | WebPoise</title>
				<meta
					name="description"
					content="Explore professional photography services including weddings, portraits, maternity, newborn, family, and event photography."
				/>
				<meta
					name="keywords"
					content="Photography Studio, Wedding Photography, Portrait Photography, Maternity Photography, Baby Shoot, Event Photography, WebPoise"
				/>
				<meta name="author" content="WebPoise" />
			</Helmet>

			<Hero />

			<div className="px-4 sm:px-6 lg:px-8">
				<About />
				<GallerySections />
			</div>
		</div>
	);
};

export default Home;