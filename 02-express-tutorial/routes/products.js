const express = require("express");
const {
    getAllProducts,
    getSingleProduct,
    getQueryProducts,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/query", getQueryProducts);
router.get("/:productID", getSingleProduct);

module.exports = router;
