const express = require("express");
const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");

const app = express();

const PORT = 3000;

// middleware
app.use(express.static("./public"));
// app.use(express.static("./methods-public"));
// parses url-encoded data that is sent by an HTML form
app.use(express.urlencoded({ extended: false }));
// parses a JSON body
app.use(express.json());

const logger = (req, res, next) => {
    console.log("method: ", req.method);
    console.log("url: ", req.url);
    console.log("time: ", new Date());
    next();
};

app.use(logger);
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productsRouter);

app.get("/api/v1/test", (req, res) => {
    return res.status(200).json({ message: "It worked!" });
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
