const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: Number, required: true },
  current_value: { type: Number, required: true },
  location: { type: String, required: true },
  rental_price_per_day: { type: Number, required: true },
  photos: [{ type: String }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
