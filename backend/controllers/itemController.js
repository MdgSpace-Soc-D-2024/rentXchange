const Item = require('../models/Item');

// Create a new item
const createItem = async (req, res) => {
    try {
        const { name, category, age, current_value, location, rental_price_per_day, description } = req.body;

        if (!name || !category || !age || !current_value || !location || !rental_price_per_day) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const photos = req.files.map(file => file.path);

        const newItem = new Item({
            owner_id: req.user?.id || 'guest',
            name,
            category,
            age,
            current_value,
            location,
            rental_price_per_day,
            photos,
            description,
        });

        await newItem.save();
        res.status(201).json({ message: 'Item listed successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createItem };
