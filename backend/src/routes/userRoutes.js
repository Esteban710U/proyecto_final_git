const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', userController.me);
router.put('/me/puntaje', userController.actualizarPuntaje);

module.exports = router;
