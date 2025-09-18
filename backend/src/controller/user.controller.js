const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../models/custom-error.model");

const userService = require("../services/user.service");

exports.updateUser = async (req, res) => {
    const userId = req.userId;
    const { email, password } = req.body;

    var hashedPassword;
    if (password) hashedPassword = bcrypt.hashSync(password, 10);
    await userService.updateUserById(userId, email, hashedPassword);

    res.sendStatus(200);
};

exports.deleteUser = async (req, res) => {
    const userId = req.userId;

    const deletedUser = await userService.deleteUserById(userId);

    if (!deletedUser) throw new NotFoundError("User to delete was not found or not authorized to delete this user");

    return res.sendStatus(200);
};