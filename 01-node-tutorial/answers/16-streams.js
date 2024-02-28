const { error } = require("console");
const { createReadStream } = require("fs");

const filePath = "../content/big.txt";

const stream = createReadStream(filePath, {
    highWaterMark: 200,
    encoding: "utf-8",
});

let counter = 0;
stream
    .on("data", (result) => {
        counter++;
        console.log(result);
    })
    .on("error", () => {
        console.log(error.message);
    })
    .on("end", () => {
        console.log(counter);
    });
