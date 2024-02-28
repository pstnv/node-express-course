const { writeFile, readFile } = require("fs").promises;

const filePath = "./temporary/temp.txt";

async function writer() {
    try {
        for (let i = 1; i <= 3; i++) {
            await writeFile(
                filePath,
                `Hello from the writeWithPromisesAwait function! Line code ${i}.\n`,
                {
                    flag: "a",
                }
            );
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function reader() {
    try {
        const text = await readFile(filePath, { encoding: "utf-8" });
        console.log(text);
    } catch (error) {
        console.log(error.message);
    }
}

async function readWrite() {
    try {
        await writer();
        await reader();
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("Done!");
    }
}

readWrite();
