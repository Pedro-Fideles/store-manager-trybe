const express = require('express');
const Sales = require('../controllers/Sales');
const { validateSale } = require('../middlewares/salesValidation');

const router = express.Router();

router.post('/', validateSale, Sales.create);

router.get('/', Sales.list);

router.get('/:id', Sales.getById);

router.delete('/:id', Sales.exclude);

router.put('/:id', validateSale, Sales.update);

module.exports = router;
