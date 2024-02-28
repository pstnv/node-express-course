const { writeFile, readFile } = require("fs").promises;

const filePath = "./temporary/temp.txt";
let i = 0;

const writeFileFunc = () => {
    const str = `Hello from the writeWithPromisesThen function! Line code ${++i}.\n`;
    return writeFile(
        filePath,
        str,
        {
            flag: "a",
        }
    );
}

writeFileFunc()
    .then(() => {
        return writeFileFunc();
    })
    .then(() => {
        return writeFileFunc();
    })
    .then(() => {
        return readFile(filePath, { encoding: "utf-8" });
    })
    .then((text) => {
        console.log(text);
    })
    .catch((error) => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("Done!");
    });
