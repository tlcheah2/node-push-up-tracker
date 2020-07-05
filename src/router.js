const express = require('express');
const router = express.Router();
const pushupController = require('./pushup/pushupController');

router.get('/pushup/today', pushupController.getTodayPushup);

router.get('/pushup', pushupController.getPushupWithDate);

module.exports = router;