const express = require("express");
const { products } = require("./data");

const app = express();

const PORT = 3000;

// middleware
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
    return res.status(200).json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
    return res.status(200).json({ success: true, data: products });
});

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((product) => product.id === idToFind);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, messsage: "That product was not found" });
    }
    return res.status(200).json({ success: true, data: { product } });
});

app.get("/api/v1/query", (req, res) => {
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
});

app.all("*", (req, res) => {
    // res.writeHead
    return res
        .type("html")
        .status(404)
        .send('<h2 style="color:red">Sorry! This page doesn\'t exist.</h2>');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
