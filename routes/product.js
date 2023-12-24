const express = require("express");
const router = express.Router();
const {getAllProducts, getAllProductsTesting} = require("../controllers/product")

/**
 * @method GET
 * @access public
 * @api /api/
 * @desc test route
 */

router.get("/",getAllProducts);
router.get("/testing",getAllProductsTesting);

module.exports = router;