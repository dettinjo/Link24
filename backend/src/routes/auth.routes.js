const express = require("express");
const router = express.Router();

const { jwtAuth } = require("../middlewares/jwt-auth.middleware");
const { validEmailExisting, passwordExisting, strongPasswordExisting, validate } = require("../middlewares/validators.middleware");
const authController = require("../controller/auth.controller");

router.get("/check",
    jwtAuth,
    authController.checkTokenStillValid
);

router.post("/login",
    validEmailExisting,
    passwordExisting,
    validate,
    authController.login
);

router.post("/signup",
    validEmailExisting,
    strongPasswordExisting,
    validate,
    authController.register
);

module.exports = router;
