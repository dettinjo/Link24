module.exports = (err, req, res, next) => {
    // Avoid logging expected errors for tests
    if (process.env.NODE_ENV === "test") {
        switch (err.statusCode) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 409:
                break;
            default:
                console.log(err);
        }
    } else {
        console.log(err);
    }

    if (err.statusCode && err.message) return res.status(err.statusCode).send({ message: err.message });
    else if (err.statusCode) return res.sendStatus(err.statusCode);
    else return res.sendStatus(500);
};