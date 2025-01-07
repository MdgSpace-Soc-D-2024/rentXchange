const express = require('express');
const { createRentalRequest, respondToRental, updateTransactionStatus } = require('../controllers/rentalController');

const router = express.Router();

// Request a rental
router.post('/rental/request', createRentalRequest);

// Approve/Reject a rental request
router.patch('/rental/:transaction_id/response', respondToRental);

// Update transaction status (e.g., Ongoing, Completed)
router.patch('/rental/:transaction_id/status', updateTransactionStatus);

// test route
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Rental routes are working' });
});


module.exports = router;
