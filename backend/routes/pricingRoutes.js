import express from 'express';
import {
	createPricing,
	getPricing,
	updatePricing,
	deletePricing,
} from '../controllers/pricingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPricing);

router.post('/', protect, createPricing);

router.patch('/:id', protect, updatePricing);

router.delete('/:id', protect, deletePricing);

export default router;