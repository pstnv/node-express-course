const { writeFileSync, readFileSync } = require("fs");

const filePath = "./temporary/fileA.txt";

for (let i = 1; i <= 3; i++) {
    writeFileSync(filePath, `Hello from the line N ${i}!\n`, {
        flag: "a",
    });
}

const text = readFileSync(filePath, { encoding: "utf-8" });
console.log(text);
