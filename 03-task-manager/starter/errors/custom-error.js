class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomerror = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
};

module.exports = {
    createCustomerror,
    CustomAPIError,
};
