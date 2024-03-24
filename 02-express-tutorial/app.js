const express = require("express");
const cookieParser = require("cookie-parser");
const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");

const app = express();

const PORT = 3000;

// middleware
// app.use(express.static("./public"));
app.use(express.static("./methods-public"));
// parses url-encoded data that is sent by an HTML form
app.use(express.urlencoded({ extended: false }));
// parses a JSON body
app.use(express.json());
// parse the cookies
app.use(cookieParser());

const logger = (req, res, next) => {
    console.log("method: ", req.method);
    console.log("url: ", req.url);
    console.log("time: ", new Date());
    next();
};

app.use(logger);

const auth = (req, res, next) => {
    const { name } = req.cookies;
    if (!name) {
        return res
            .status(401)
            .json({ success: false, message: "unauthorized" });
    }
    req.user = name;
    next();
};

app.post("/login", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: "unauthorized" });
    }
    res.cookie("name", name);
    return res.status(201).json({ success: true, message: `Hello ${name}!` });
});
app.delete("/logoff", (req, res) => {
    res.clearCookie("name");
    return res.status(200).json({ success: true, message: `User logged off` });
});
app.get("/test", auth, (req, res) => {
    const name = req.user;
    return res.status(200).json({ success: true, message: `Welcome ${name}` });
});

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
