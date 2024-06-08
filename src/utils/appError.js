class createError extends Error {
    constructor(message, statusCode) {
        this.statusCode= statusCode;
        this.status = `${statusCode}`.startsWith('4')

        Error.captureStackTrace(this, this.constructor)
    }
}

export default createError;