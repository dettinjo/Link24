const service = require("../../src/services/link.service");
const moment = require("moment");

const mongoose = require("mongoose");
const Link = require("../../src/models/link.model");

var sampleLink;
const sampleUserId = mongoose.Types.ObjectId();
const sampleOriginal = "https://foo.bar/";
const sampleSlug = "foobar";
const sampleDaysToLive = 1;
beforeEach(async () => {
    // Create Link to work with
    sampleLink = new Link({
        user: sampleUserId,
        original: sampleOriginal,
        slug: sampleSlug,
        expiresAt: moment().add(sampleDaysToLive, "days").startOf("day")
    });

    await sampleLink.save();
});

describe("LinkService ", () => {
    describe("CREATE ", () => {
        test("createLink should create and return link", async () => {
            const link = await service.createLink(sampleUserId, sampleOriginal, "barfoo", sampleDaysToLive);
            expect(link).not.toBe(null);

            const check = await Link.findOne({
                user: sampleUserId,
                original: sampleOriginal,
                slug: "barfoo",
                expireAt: moment().add(sampleDaysToLive, "days").startOf("day")
            });
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
        });

        test("createLink with already existing slug should throw", async () => {
            await expect(
                service.createLink(sampleUserId, sampleOriginal, sampleSlug, sampleDaysToLive)
            ).rejects.toThrow();
        });
    });

    describe("READ ", () => {
        test("getAllLinksForUser should return correct links", async () => {
            // Create irrelevant link
            sampleLink = new Link({
                user: new mongoose.Types.ObjectId(),
                original: sampleOriginal,
                slug: "irrelevant",
            });
            await sampleLink.save();

            const links = await service.getAllLinksForUser(sampleUserId);

            expect(links.length).toBe(1);
        });

        test("getLinkByIdAndUser should return correct link", async () => {
            const link = await service.getLinkByIdAndUser(sampleLink.id, sampleUserId);

            expect(link).not.toBe(null);
            expect(link.id).toBe(sampleLink.id);
        });

        test("getLinkByIdAndUser with not owner user id should return null", async () => {
            const link = await service.getLinkByIdAndUser(sampleLink.id, new mongoose.Types.ObjectId());

            expect(link).toBe(null);
        });

        test("getLinkBySlug should return correct link", async () => {
            const link = await service.getLinkBySlug(sampleLink.slug);

            expect(link).not.toBe(null);
            expect(link.id).toBe(sampleLink.id);
        });
    });

    describe("UPDATE ", () => {
        test("updateCountById without count should update by one", async () => {
            const link = await service.updateCountById(sampleLink.id);

            expect(link).not.toBe(null);
            expect(link.clicks).toBe(sampleLink.clicks + 1);

            const check = await Link.findById(sampleLink.id);
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
            expect(check.clicks).toBe(link.clicks);
        });

        test("updateCountById with count should update by count amount", async () => {
            const count = 30;
            const link = await service.updateCountById(sampleLink.id, count);

            expect(link).not.toBe(null);
            expect(link.clicks).toBe(count);


            const check = await Link.findById(sampleLink.id);
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
            expect(check.clicks).toBe(link.clicks);
        });

        test("updateLink should update and return link", async () => {
            const newOriginal = "http://bar.foo/";
            const newExpireDays = 5;
            const newExpiresAt = moment(sampleLink.createdAt).add(newExpireDays, "days").startOf("day").toDate();

            const link = await service.updateLink(sampleLink.id, sampleUserId, newOriginal, newExpireDays);

            expect(link).not.toBe(null);
            expect(link.original).toBe(newOriginal);
            expect(link.expiresAt.toString()).toBe(newExpiresAt.toString());


            const check = await Link.findById(sampleLink.id);
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
            expect(check.original).toBe(link.original);
            expect(check.expiresAt.toString()).toBe(link.expiresAt.toString());
        });

        test("updateLink with only url should only update url and return link", async () => {
            const newOriginal = "http://bar.foo/";

            const link = await service.updateLink(sampleLink.id, sampleUserId, newOriginal, null);

            expect(link).not.toBe(null);
            expect(link.original).toBe(newOriginal);
            expect(link.expiresAt.toString()).toBe(sampleLink.expiresAt.toString());

            const check = await Link.findById(sampleLink.id);
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
            expect(check.original).toBe(link.original);
            expect(check.expiresAt.toString()).toBe(check.expiresAt.toString());
        });

        test("updateLink with only expireDays should update only expiresAt and return link", async () => {
            const newExpireDays = 90;
            const newExpiresAt = moment().add(newExpireDays, "days").startOf("day").toDate();

            const link = await service.updateLink(sampleLink.id, sampleUserId, null, newExpireDays);

            expect(link).not.toBe(null);
            expect(link.original).toBe(sampleLink.original);
            expect(link.expiresAt.toString()).toBe(newExpiresAt.toString());

            const check = await Link.findById(sampleLink.id);
            expect(check).not.toBe(null);
            expect(check.id).toBe(link.id);
            expect(check.original).toBe(link.original);
            expect(check.expiresAt.toString()).toBe(link.expiresAt.toString());
        });
    });

    describe("DELETE ", () => {
        test("deleteLink should delete link and return the deleted link", async () => {
            const link = await service.deleteLink(sampleLink.id, sampleUserId);
            expect(link).not.toBe(null);
            expect(link.id).toBe(sampleLink.id);

            const check = await Link.findById(sampleLink.id);
            expect(check).toBe(null);
        });
    });
});