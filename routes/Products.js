const express = require('express');
const Products = require('../controllers/Products');
const { validateName } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', Products.list);

router.get('/:id', Products.getById);

router.post('/', validateName, Products.create);

router.put('/:id', validateName, Products.update);

module.exports = router;
