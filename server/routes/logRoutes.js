const express = require('express');
const router = express.Router();

// Model
const Log = require('../models/logSchema.js');

// GET request to fetch log data
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST request to add a new log entry
router.post('/', async (req, res) => {
    const log = new Log({
		item: req.body.item,
		status: req.body.status
    });

    try {
        const newLog = await log.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE request to reset the log
router.delete('/', async (req, res) => {
    try {
        await Log.deleteMany({});
        res.json({ message: 'Log cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;