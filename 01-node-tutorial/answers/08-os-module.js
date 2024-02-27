const os = require("os");

// info about current user
const userInfo = os.userInfo();
console.log(userInfo);

// system uptime in seconds
console.log(`The System uptime is ${os.uptime()} seconds.`);

const currentsOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
};
console.log(currentsOS);
