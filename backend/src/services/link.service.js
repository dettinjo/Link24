const Link = require("../models/link.model");
const { BadRequestError } = require("../models/custom-error.model");

const moment = require("moment");

/* CREATE */
exports.createLink = async (userId, url, slug, daysToLive) => {
    const link = new Link({ user: userId, original: url });

    if (slug) link.slug = encodeURIComponent(slug);
    if (daysToLive) link.expiresAt = moment().add(daysToLive, "days").startOf("day");

    await link.save();

    return link;
};

/* READ */
exports.getAllLinksForUser = async (userId) => {
    const link = await Link.find({ user: userId });
    return link;
};

exports.getLinkByIdAndUser = async (id, userId) => {
    const link = await Link.findById(id).where({ user: userId });
    return link;
};

exports.getLinkBySlug = async (slug) => {
    const link = await Link.findOne({ slug: slug });

    return link;
};

/* UPDATE */
exports.updateCountById = async (id, count) => {
    const link = await Link.findById(id);

    if (count) link.clicks = link.clicks + count;
    else link.clicks = link.clicks + 1;

    await link.save();
    return link;
};

exports.updateLink = async (id, userId, url, expireDays) => {
    const link = await Link.findById(id).where({ user: userId });

    if (url) link.original = url;

    if (expireDays) {
        const newExpireDate = moment(link.createdAt).add(expireDays, "days").startOf("day");

        if (newExpireDate.isBefore(moment())) {
            throw new BadRequestError("Expire Date can't be in the past");
        }

        link.expiresAt = newExpireDate;
    }

    await link.save();
    return link;
};

/* DELETE */
exports.deleteLink = async (id, userId) => {
    const deletedLink = await Link.findByIdAndDelete(id).where({ user: userId });
    return deletedLink;
};