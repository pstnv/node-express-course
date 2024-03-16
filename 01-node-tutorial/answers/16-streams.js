const { error } = require("console");
const { createReadStream } = require("fs");

const filePath = "../content/big.txt";

const stream = createReadStream(filePath, {
    highWaterMark: 200,
    encoding: "utf-8",
});

let chunksCounter = 0;
stream
    .on("data", (result) => {
        chunksCounter++;
        console.log(result);
    })
    .on("error", () => {
        console.log(error.message);
    })
    .on("end", () => {
        console.log(`Total chunks: ${chunksCounter}.`);
    });
