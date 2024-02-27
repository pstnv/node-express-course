const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
    const decode = new StringDecoder("utf-8");
    let body = "";
    req.on("data", function (data) {
        body += decode.write(data);
    });
    req.on("end", function () {
        body += decode.end();
        // change decode function to correct #HEX
        const body1 = decodeURIComponent(body);
        const bodyArray = body1.split("&");
        const resultHash = {};
        bodyArray.forEach((part) => {
            const partArray = part.split("=");
            resultHash[partArray[0]] = partArray[1];
        });
        callback(resultHash);
    });
};

// declare variables to store what comes back from the form.
let text = "Choose a color for the background.";
let textColor = "#ffffff"; // default color
let bgColor = "#3bf7e1"; // default color

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
    return `
    <body style="background-color:${bgColor}">
        <p style="font-size:30px;color:${textColor}">${text}</p>
        <form method="POST">
            <input name="color" type="color" value="${bgColor}"></input>
            <button type="submit">Submit</button>
        </form>
    </body>
    `;
};

// function to get random color
const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    const hexBg = "#" + n.slice(0, 6);
    return hexBg;
};

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        getBody(req, (body) => {
            // if user didn't choose a color, generate random color
            if (body["color"] === bgColor) {
                text = "Haven't chosen yet? I'll help you ;)";
                bgColor = randomHexColorCode();
            } else {
                bgColor = body["color"];
                text = "Excellent choice!";
            }
            // if chosen or generated bgColor is white change font color to black
            textColor = bgColor === "#ffffff" ? "#000000" : "#ffffff";
            // my code changes ended here
            res.writeHead(303, {
                Location: "/",
            });
            res.end();
        });
    } else {
        res.end(form());
    }
});

server.listen(3000, () => console.log("The server is listening on port 3000."));
