const Transaction = require('../models/Transaction');
const Item = require('../models/Item');

const createRentalRequest = async (req, res) => {
    try {
        const { item_id, renter_id, start_date, end_date } = req.body;

        // Fetch item details
        const item = await Item.findById(item_id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Calculate rental price and security deposit
        const rentalDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24);
        const rental_price = rentalDays * item.rental_price_per_day;
        const security_deposit = item.current_value * 0.25;

        // Create a transaction
        const transaction = new Transaction({
            item_id,
            renter_id,
            lender_id: item.owner_id,
            start_date,
            end_date,
            rental_price,
            security_deposit,
        });

        await transaction.save();
        res.status(201).json({ message: 'Rental request submitted', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const respondToRental = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { status } = req.body; // 'Approved' or 'Rejected'

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const transaction = await Transaction.findByIdAndUpdate(transaction_id, { status }, { new: true });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        res.status(200).json({ message: `Rental request ${status.toLowerCase()}`, transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateTransactionStatus = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { status } = req.body; // 'Ongoing' or 'Completed'

        if (!['Ongoing', 'Completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const transaction = await Transaction.findByIdAndUpdate(transaction_id, { status }, { new: true });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        res.status(200).json({ message: `Transaction status updated to ${status}`, transaction });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createRentalRequest, respondToRental, updateTransactionStatus };
