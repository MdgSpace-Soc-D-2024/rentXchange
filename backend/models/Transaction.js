const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    renter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    rental_price: { type: Number, required: true },
    security_deposit: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Ongoing', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
