class BadRequestError extends Error {
    constructor (message) {
        super(message);

        this.name = 'Bad Request';
        this.statusCode = 400;
        this.message = message;
    }
};

class UnauthenticatedError extends Error {
    constructor (message) {
        super(message);

        this.name = 'Unauthenticated';
        this.statusCode = 401;
    }
}

class NotAuthorizedError extends Error {
    constructor (message) {
        super(message);

        this.name = 'Not Authorized';
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor (message) {
        super(message);

        this.name = 'Not Found';
        this.statusCode = 404;
    }
}

class ConflictError extends Error {
    constructor (message) {
        super(message);

        this.name = 'Conflict';
        this.statusCode = 409;
    }
}


module.exports = { BadRequestError, UnauthenticatedError, NotAuthorizedError, NotFoundError, ConflictError };
