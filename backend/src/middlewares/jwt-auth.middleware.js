const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../models/custom-error.model");

exports.jwtAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.BACKEND_JWT_SECRET);

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    throw new UnauthenticatedError("Provided token is not valid");
  }
};


exports.optionalJwtAuth = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return next();

  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.BACKEND_JWT_SECRET);

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      throw new UnauthenticatedError("Provided token is not valid");
    else throw error;
  }
};

