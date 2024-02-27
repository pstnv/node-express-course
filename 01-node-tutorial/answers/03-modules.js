const childrenNames = require("./04-names");
const greetStark = require("./05-utils");
const data = require("./06-alternative-flavor");
require('./07-mind-grenade');

const {
    parentsNames,
    family: { lastName },
} = data;

const names = [...parentsNames, ...Object.values(childrenNames)];
names.forEach((name) => {
    greetStark(name, lastName);
});
