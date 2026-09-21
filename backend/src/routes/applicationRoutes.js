const express = require('express');
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/', applicationController.inscribirse);
router.get('/estado', applicationController.estado);
router.get('/historial', applicationController.historial);

module.exports = router;
