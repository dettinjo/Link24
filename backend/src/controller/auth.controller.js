const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const { BadRequestError, UnauthenticatedError, ConflictError } = require("../models/custom-error.model");

exports.checkTokenStillValid = (req, res) => {
    // If user gets here, token is still valid.
    return res.sendStatus(200);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) throw new UnauthenticatedError("Email or Password is invalid");

    // Check password
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthenticatedError("Email or Password is invalid");

    return res.status(200).send({
        token: jwt.sign(
            { userId: user._id.toString() },
            process.env.BACKEND_JWT_SECRET,
            { expiresIn: "1d" }
        ),
    });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) throw new ConflictError();

    hashedPassword = bcrypt.hashSync(password, 10);
    const user = await userService.createUser(email, hashedPassword);

    return res.status(201).send({
        token: jwt.sign(
            { userId: user._id.toString() },
            process.env.BACKEND_JWT_SECRET,
            { expiresIn: "1d" }
        ),
    });
};