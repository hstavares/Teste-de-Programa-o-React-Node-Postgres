const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes-controller')


router.get('/', clientesController.index);
router.post('/cadastrar', clientesController.create);
router.post('/gerarRota', clientesController.gerarRota);

module.exports = router;