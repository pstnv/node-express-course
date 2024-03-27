const CustomAPIError = require("./custom-error");
const UnauthentificatedError = require("./unauthentificated");
const BadRequestError = require("./bad-request");

module.exports = { CustomAPIError, BadRequestError, UnauthentificatedError };
