const express = require('express');
const Products = require('../controllers/Products');

const router = express.Router();

router.get('/', Products.list);

router.get('/:id', Products.getById);

module.exports = router;
