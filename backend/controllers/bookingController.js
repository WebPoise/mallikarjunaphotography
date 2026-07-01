import Booking from '../models/bookingModel.js';

// Create a new booking
export const createBooking = async (req, res) => {
	try {
		const booking = await Booking.create(req.body);

		res.status(201).json({
			success: true,
			message: 'Booking created successfully',
			booking,
		});
	} catch (error) {
		console.error('Error creating booking:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all bookings for admin
export const getBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({}).sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			bookings,
		});
	} catch (error) {
		console.error('Error fetching bookings:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const booking = await Booking.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true }
		);

		if (!booking) {
			return res.status(404).json({
				success: false,
				message: 'Booking not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Booking status updated',
			booking,
		});
	} catch (error) {
		console.error('Error updating booking status:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Delete booking
export const deleteBooking = async (req, res) => {
	try {
		const booking = await Booking.findByIdAndDelete(req.params.id);

		if (!booking) {
			return res.status(404).json({
				success: false,
				message: 'Booking not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Booking deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting booking:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};