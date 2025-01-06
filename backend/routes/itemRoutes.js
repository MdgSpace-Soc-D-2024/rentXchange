const express = require('express');
const { createItem } = require('../controllers/itemController');
const upload = require('../middleware/fileUpload'); // Multer setup

const router = express.Router();

// POST: Add a new item
router.post('/items', upload.array('photos', 5), createItem);

module.exports = router;
