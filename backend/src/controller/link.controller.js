const linkService = require("../services/link.service");
const { BadRequestError, UnauthenticatedError, NotAuthorizedError, NotFoundError, ConflictError } = require("../models/custom-error.model");
const { validationResult } = require("express-validator");

exports.getLinkBySlug = async (req, res) => {
    const slug = encodeURIComponent(req.params.slug);
    const link = await linkService.getLinkBySlug(slug);

    if (!link) throw new NotFoundError(`Link with provided slug: ${slug} not found`);

    await linkService.updateCountById(link.id);

    return res.send({ url: link.original });
};

exports.getLinksForUser = async (req, res) => {
    const userId = req.userId;
    const links = await linkService.getAllLinksForUser(userId);

    return res.status(200).send({ links: links });
};

exports.createLink = async (req, res) => {
    const userId = req.userId;
    const { url, slug, expireDays } = req.body;

    if ((slug && !userId) || (expireDays && !userId)) throw new NotAuthorizedError("You need to be logged in to provide additional params");

    const existingLinkWithSlug = await linkService.getLinkBySlug(slug);
    if (existingLinkWithSlug) throw new ConflictError("Slug already in use");

    const link = await linkService.createLink(userId, url, slug, expireDays);

    return res.status(201).send(link);
};

exports.updateLink = async (req, res) => {
    const userId = req.userId;
    const { id: linkId, url, expireDays } = req.body;

    const link = await linkService.getLinkByIdAndUser(linkId, userId);
    if (!link) throw new NotFoundError("Link to update was not found or not authorized to update this link");

    await linkService.updateLink(link.id, userId, url, expireDays);

    return res.sendStatus(200);
};

exports.deleteLink = async (req, res) => {
    const userId = req.userId;
    const { id: linkId } = req.body;

    if (!linkId) throw new BadRequestError("Parameter linkId not provided");

    const deletedLink = await linkService.deleteLink(linkId, userId);

    if (!deletedLink) throw new NotFoundError("Link to delete was not found or not authorized to delete this link");

    return res.sendStatus(200);
};