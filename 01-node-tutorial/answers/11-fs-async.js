const { writeFile } = require("fs");

const filePath = "./temporary/fileB.txt";

// task: use async function to see how looks like callback hell

// 1st method - when use recursion this isn't looks so bad
function writeFileAsync(i) {
    if (i > 3) {
        console.log("at end");
        return;
    }
    writeFile(
        filePath,
        `This is line ${i}\n`,
        { flag: "a" },
        (error, result) => {
            console.log(`at point ${i}`);
            if (error) {
                console.log("This error happened: ", error.message);
                return;
            }
            writeFileAsync(i + 1);
        }
    );
}

console.log("at start");
writeFileAsync(1);

// 2nd method - and when use only callbacks we can see it clearly
// console.log("at start");
// writeFile(filePath, "This is line 1\n", { flag: "a" }, (error, result) => {
//     console.log("at point 1");
//     if (error) {
//         console.log("This error happened: ", error.message);
//         return;
//     }
//     writeFile(filePath, "This is line 2\n", { flag: "a" }, (error, result) => {
//         console.log("at point 2");
//         if (error) {
//             console.log("This error happened: ", error.message);
//             return;
//         }
//         writeFile(
//             filePath,
//             "This is line 3\n",
//             { flag: "a" },
//             (error, result) => {
//                 console.log("at point 3");
//                 if (error) {
//                     console.log("This error happened: ", error.message);
//                     return;
//                 }
//                 console.log("at end");
//             }
//         );
//     });
// });
