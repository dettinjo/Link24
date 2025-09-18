const express = require("express");
const router = express.Router();

const linkController = require("../controller/link.controller");
const { optionalJwtAuth, jwtAuth } = require("../middlewares/jwt-auth.middleware");
const { validUrlExisting, validSlug, validExpireDays, validate, linkIdExisting, urlOrExpireDays } = require("../middlewares/validators.middleware");

router.get("/:slug",
    linkController.getLinkBySlug);

router.get("/",
    jwtAuth,
    linkController.getLinksForUser
);
router.post("/",
    optionalJwtAuth,
    validUrlExisting,
    validSlug,
    validExpireDays,
    validate,
    linkController.createLink
);
router.patch("/",
    jwtAuth,
    linkIdExisting,
    urlOrExpireDays,
    validate,
    linkController.updateLink
);
router.delete("/",
    jwtAuth,
    linkIdExisting,
    validate,
    linkController.deleteLink
);

module.exports = router;
