const path = require("path");

const filePath = path.join("/temporary", ".keep");
console.log(filePath); // \temporary\.keep

const file = path.basename(filePath);
console.log(file); // .keep

const absolutePath = path.resolve(__dirname, "03-modules.js");
console.log(absolutePath);
