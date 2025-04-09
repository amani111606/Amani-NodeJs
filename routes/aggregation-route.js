
const express = require('express');
const router = express.Router();
const {insertSampleModel,getProductStats,getproductsanalysis} = require('../controllers/product-controller')

router.post('/addproduct',insertSampleModel);
router.get('/stats',getProductStats);
router.get('/analysis',getproductsanalysis)


module.exports = router;