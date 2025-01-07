const express = require('express');
const { createItem } = require('../controllers/itemController');
const upload = require('../middleware/fileUpload'); // Multer setup

const router = express.Router();

// POST: Add a new item
router.post('/items', upload.array('photos', 5), createItem);

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
