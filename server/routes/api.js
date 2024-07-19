const express = require('express');
const router = express.Router();

// Sample endpoint
router.get('/load', (req, res) => {
    res.json({ message: 'Describe a song...', songs: []});
});


module.exports = router;