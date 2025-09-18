const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const { jwtAuth } = require("../middlewares/jwt-auth.middleware");
const { emailOrStrongPass, validate, } = require("../middlewares/validators.middleware");

router.patch("/",
    jwtAuth,
    emailOrStrongPass,
    validate,
    userController.updateUser
);
router.delete("/",
    jwtAuth,
    userController.deleteUser
);

module.exports = router;
