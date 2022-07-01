const express = require('express');
const Sales = require('../controllers/Sales');
const { validateSale } = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', validateSale, Sales.create);

module.exports = router;
