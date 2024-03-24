const { products } = require("../data");

const getAllProducts = (req, res) => {
    return res.status(200).json({ success: true, data: products });
};

const getSingleProduct = (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((product) => product.id === idToFind);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "That product was not found" });
    }
    return res.status(200).json({ success: true, data: { product } });
};

const getQueryProducts = (req, res) => {
    const { maxprice: maxPrice, search, limit } = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) =>
            product.name.startsWith(search)
        );
    }
    if (maxPrice) {
        sortedProducts = sortedProducts.filter(
            (product) => product.price < parseFloat(maxPrice)
        );
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, parseInt(limit));
    }
    if (!sortedProducts.length) {
        return (
            res
                .status(200)
                // .json({ success: true, data: [] })
                .type("html")
                .send("<h3>No products matched your search</h3>")
        );
    }
    return res.status(200).json({ success: true, data: sortedProducts });
};

module.exports = { getAllProducts, getSingleProduct, getQueryProducts };
