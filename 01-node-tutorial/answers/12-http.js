const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to the Node.js class - giraffe!");
        return;
    }
    if (req.url === "/about") {
        res.end("You're on the first week of Node.js class. Great start!");
        return;
    }
    res.end(`
    <div style="display:flex;flex-direction:column;align-items:center;">
        <h1>Programming isn't that easy.</h1>
        <h2 style="font-size:30px">But the good news...</h2>
        <h3 style="font-size:50px; color: red;">You can do it!</h3>
        <h4 style="font-size:30px">Just keep practicing!</h4>
    </div>
    `);
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
