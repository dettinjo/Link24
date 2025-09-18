
const { body, validationResult, oneOf } = require("express-validator");
const { BadRequestError } = require("../models/custom-error.model");

exports.validEmailExisting =
    body("email")
        .exists({ checkFalsy: true })
        .withMessage("must be provided")
        .isEmail()
        .withMessage("must be valid email address");

exports.passwordExisting =
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("must be provided");

exports.strongPasswordExisting =
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("must be provided")
        .isStrongPassword({ minSymbols: 0 })
        .withMessage("must be at least 8 chars long and contain at least one lowercase, one uppercase and one number");


exports.validUrl =
    body("url")
        .if(body("url").exists())
        .isURL()
        .withMessage("must be valid url");

exports.validUrlExisting =
    body("url")
        .exists({ checkFalsy: true })
        .withMessage("must be provided")
        .isURL()
        .withMessage("must be valid url");

exports.validSlug =
    body("slug")
        .if(body("slug").exists())
        .isString()
        .withMessage("must be a valid string");

exports.validExpireDays =
    body("expireDays")
        .if(body("expireDays").exists())
        .isInt({ allow_leading_zeroes: true })
        .withMessage("must be valid number");

const validExpireDaysExisting = body("expireDays")
    .exists({ checkFalsy: true })
    .withMessage("must be provided")
    .isInt({ allow_leading_zeroes: true })
    .withMessage("must be valid number");

exports.urlOrExpireDays = oneOf([
    this.validUrlExisting,
    validExpireDaysExisting
], "at least one of url or expireDays needs to be provided to update link");

exports.emailOrStrongPass = oneOf([
    this.validEmailExisting,
    this.strongPasswordExisting,
], "at least one of email or password needs to be provided to update user");

exports.linkIdExisting =
    body("id")
        .exists({ checkFalsy: true })
        .withMessage("must be provided");

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new BadRequestError(errors.array({ onlyFirstError: true }));

    return next();
};