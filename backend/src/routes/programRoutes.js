const express = require('express');
const programController = require('../controllers/programController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', programController.listar);
router.get('/elegibles', authMiddleware, programController.elegibles);

module.exports = router;
